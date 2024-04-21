Users = Users or {}
Post = Post or {}

local function Username_exists(username)
    for key, value in pairs(Users) do
       for field, val in pairs(value) do
            if field == "username" and val == username then
                return true
            end
        end
    end
    return false
end

local function Preprocess_data(data)
    if type(data) == "table" then
        local cleaned_data = {}
        for k, v in pairs(data) do
            if next(v) ~= nil then
                cleaned_data[k] = v
            end
        end
        return cleaned_data
    elseif type(data) == "string" then
        if data == "" then
            return "<empty>"
        end
    end
    return data
end

local function Search(param)
    local maps = {}
    for key, value in pairs(Users) do
       for field, val in pairs(value) do
            if field == "username" and val == param then
                table.insert(maps,value)
            end
        end
    end
    for key, value in pairs(Post) do
       for field, val in pairs(value) do
            if field == "name" and val == param then
                table.insert(maps,value)
            end
        end
    end
    return maps
end
Handlers.add('check_user_exist',Handlers.utils.hasMatchingTag("Action","check_user_exist"), function (msg)
    local json = require('json')
    if Users[msg.From] ~= nil then
        local user = Users[msg.From]
        local username = user.username
        local name = user.name
        local image = user.image
        local following = Preprocess_data(user.following)
        local follower = Preprocess_data(user.follower)
        local description = Preprocess_data(user.description)
        local notification = Preprocess_data(user.notification)
        local data = {
            username = username,
            name = name,
            image = image,
            following = following,
            follower = follower,
            description = description,
            notification = notification
        }
        local result = json.encode({status = 1, data = data})
        Handlers.utils.reply(result)(msg)
        return
    end
        local result = string.format(json.encode({status = 0, data = "Account is not Register"}))
        Handlers.utils.reply(result)(msg)
end)

Handlers.add('check_username',Handlers.utils.hasMatchingTag("Action","check_username"), function (msg)
    assert(type(msg.Tags.username) == "string" and msg.Tags.username ~= nil,"username is missing")
    local json = require('json')
    if Username_exists(msg.Tags.username) then
        local result = string.format(json.encode({status = 1, data = "Username Registered"}))
        Handlers.utils.reply(result)(msg)
        return
    end
        local result = string.format(json.encode({status = 0, data = "Username not Registered"}))
        Handlers.utils.reply(result)(msg)
end)


Handlers.add('register_user',Handlers.utils.hasMatchingTag("Action","register_user"), function (msg)
    local json = require('json')
    if(Users[msg.From] ~= nil) then
        local result = string.format(json.encode({status = 0, data = "Account is already Register"}))
        Handlers.utils.reply(result)(msg)
        return
    end
    assert(type(msg.Tags.username) == "string" and msg.Tags.username ~= nil,"username is missing")
    if(Username_exists(msg.Tags.username)) then
        local result = string.format(json.encode({status = 0, data = "Username Registered"}))
        Handlers.utils.reply(result)(msg)
        return
    end
    assert(type(msg.Tags.name) == "string" and msg.Tags.name ~= nil,"name is missing")
    assert(type(msg.Data) == "string" and msg.Data ~= nil,"image is missing")
    Users[msg.From] = {}
    Users[msg.From].username = msg.Tags.username
    Users[msg.From].name = msg.Tags.name
    Users[msg.From].image = msg.Data
    Users[msg.From].description = ""
    Users[msg.From].follower = {}
    Users[msg.From].following = {}
    Users[msg.From].notification = {}
    local result = string.format(json.encode({status = 1, data = "Account Registered"}))
    Handlers.utils.reply(result)(msg)
end)

Handlers.add('get',Handlers.utils.hasMatchingTag("Action","get"), function (msg)
    local json = require('json')
    if(Users[msg.From] ~= nil) then
        local user = Users[msg.From]
        local username = user.username
        local name = user.name
        local image = user.image
        local following = Preprocess_data(user.following)
        local follower = Preprocess_data(user.follower)
        local description = Preprocess_data(user.description)
        local notification = Preprocess_data(user.notification)
        local data = {
            username = username,
            name = name,
            image = image,
            following = following,
            follower = follower,
            description = description,
            notification = notification
        }
        local result = json.encode({status = 1, data = data})
        Handlers.utils.reply(result)(msg)
        return
    end
        local result = string.format(json.encode({status = 0, data = "Account is not Register"}))
        Handlers.utils.reply(result)(msg)
end)

Handlers.add('get_user',Handlers.utils.hasMatchingTag("Action","get_user"), function (msg)
    local json = require('json')
    assert(type(msg.Tags.username) == "string" and msg.Tags.username ~= nil,"username is missing")
    if(Username_exists(msg.Tags.username)) then
        for key, value in pairs(Users) do
            for field, val in pairs(value) do
                if field == "username" and val == msg.Tags.username then
                            local user = Users[key]
                            local username = user.username
                            local name = user.name
                            local image = user.image
                            local following = Preprocess_data(user.following)
                            local follower = Preprocess_data(user.follower)
                            local description = Preprocess_data(user.description)
                            local notification = Preprocess_data(user.notification)
        local data = {
            username = username,
            name = name,
            image = image,
            following = following,
            follower = follower,
            description = description,
            notification = notification
        }
        local result = json.encode({status = 1, data = data})
        Handlers.utils.reply(result)(msg)
                    return
                end
            end
        end
    end
    local result = string.format(json.encode({status = 0, data = "Username not Registered"}))
    Handlers.utils.reply(result)(msg)
end)

Handlers.add('add_post',Handlers.utils.hasMatchingTag("Action","add_post"), function (msg)
    local json = require('json')
    if (Users[msg.From] == nil) then
        local result = string.format(json.encode({status = 0, data = "Account is not Register"}))
        Handlers.utils.reply(result)(msg)
        return
    end
    assert(type(msg.Data) == "string" and msg.Data ~= nil,"Post Data is not available")
    assert(type(msg.Tags.time) == "string" and msg.Tags.time ~= nil,"Time is not available")
    local base64 = require(".base64")
    local user = Users[msg.From]
    local str = (msg.Tags.time..msg.From)
    local id = base64.encode(str,base64.makeencoder("+", "/", "="),true)
    if id ~= nil then
    table.insert(Post,{owner = msg.From, data = msg.Data, time = msg.Tags.time, username = user.username, like = {}, comment = {}, id = id})
    local result = string.format(json.encode({status = 1, data = "Post Added"}))
    Handlers.utils.reply(result)(msg)
    else
        local result = string.format(json.encode({status = 0, data = "Post Not Added, Problem in encryption"}))
        Handlers.utils.reply(result)(msg)
    end
end)

Handlers.add("get_post",Handlers.utils.hasMatchingTag("Action","get_post"), function (msg)
   local json = require("json")
   local utils = require(".utils")
    if (Users[msg.From] == nil) then
        local result = string.format(json.encode({status = 0, data = "Account is not Register"}))
        Handlers.utils.reply(result)(msg)
        return
    end
    local posts = utils.filter(function (val)
        return val.owner == msg.From
    end,Post)
    if posts ~= "[]" then
       local result = string.format(json.encode({status = 1, data = posts}))
       Handlers.utils.reply(result)(msg)
       return
    else
        local result = string.format(json.encode({status = 0, data = "No Post"}))
        Handlers.utils.reply(result)(msg)
        return
    end
end)

Handlers.add("get_post_username",Handlers.utils.hasMatchingTag("Action","get_post_username"), function (msg)
   local json = require("json")
   local utils = require(".utils")
   if (Users[msg.From] == nil) then
    local result = string.format(json.encode({status = 0, data = "Account is not Register"}))
    Handlers.utils.reply(result)(msg)
    return
   end
    local posts = utils.filter(function (val)
        return val.username == msg.Tags.username
    end,Post)
    if posts ~= "[]" then
       local result = string.format(json.encode({status = 1, data = posts}))
       Handlers.utils.reply(result)(msg)
       return
    else
        local result = string.format(json.encode({status = 0, data = "No Post"}))
        Handlers.utils.reply(result)(msg)
        return
    end
end)

Handlers.add("like",Handlers.utils.hasMatchingTag("Action","like"), function (msg)
   local json = require("json")
   if (Users[msg.From] == nil) then
    local result = string.format(json.encode({status = 0, data = "Account is not Register"}))
    Handlers.utils.reply(result)(msg)
    return
   end
   assert(type(msg.Tags.id) == "string" and msg.Tags.id ~= nil,"Post id is missing")
   local utils = require(".utils")
   local posts = utils.filter(function (val)
        return val.id == msg.Tags.id
   end,Post)
    if posts ~= "[]" then
       table.insert(posts[1].like,msg.From)
       if Users[msg.From].username ~= posts[1].username then
        table.insert(Users[posts[1].owner].notification,{data="like",username = Users[msg.From].username, seen=false})
       end
       local result = string.format(json.encode({status = 1, data = "Post Liked"}))
       Handlers.utils.reply(result)(msg)
       return
    else
        local result = string.format(json.encode({status = 0, data = "No Post"}))
        Handlers.utils.reply(result)(msg)
        return
    end
end)

Handlers.add("comment",Handlers.utils.hasMatchingTag("Action","comment"), function (msg)
   local json = require("json")
   if (Users[msg.From] == nil) then
    local result = string.format(json.encode({status = 0, data = "Account is not Register"}))
    Handlers.utils.reply(result)(msg)
    return
   end
   assert(type(msg.Tags.id) == "string" and msg.Tags.id ~= nil,"Post id is missing")
   assert(type(msg.Data) == "string" and msg.Data ~= nil,"Comment is missing")
    local utils = require(".utils")
    local posts = utils.filter(function (val)
        return val.id == msg.Tags.id
    end,Post)
    if posts ~= "[]" then
       table.insert(posts[1].comment,{username = Users[msg.From].username, data = msg.Data})
       if Users[msg.From].username ~= posts[1].username then
        table.insert(Users[Post[posts[1].owner].username].notification,{data="comment",username = Users[msg.From].username, seen = false})
       end
       local result = string.format(json.encode({status = 1, data = "Post Commented"}))
       Handlers.utils.reply(result)(msg)
       return
    else
        local result = string.format(json.encode({status = 0, data = "No Post"}))
        Handlers.utils.reply(result)(msg)
        return
    end
end)

Handlers.add("update",Handlers.utils.hasMatchingTag("Action","update"), function (msg)
   local json = require("json")
   if (Users[msg.From] == nil) then
    local result = string.format(json.encode({status = 0, data = "Account is not Register"}))
    Handlers.utils.reply(result)(msg)
    return
   end
   local user = Users[msg.From]
   if(msg.Tags.username ~= nil) then
       user.username = msg.Tags.username
   end
   if(msg.Tags.name ~= nil) then
       user.name = msg.Tags.name
   end
   if(msg.Tags.description ~= nil) then
       user.description = msg.Tags.description
   end
   local result = string.format(json.encode({status = 1, data = "Account Updated"}))
   Handlers.utils.reply(result)(msg)
end)

Handlers.add("follow",Handlers.utils.hasMatchingTag("Action","follow"), function (msg)
   local json = require("json")
   if (Users[msg.From] == nil) then
    local result = string.format(json.encode({status = 0, data = "Account is not Register"}))
    Handlers.utils.reply(result)(msg)
    return
   end
   if (Users[msg.Tags.username] == nil) then
    local result = string.format(json.encode({status = 0, data = "Account is not Register"}))
    Handlers.utils.reply(result)(msg)
    return
   end
   table.insert(Users[msg.From].following,msg.Tags.username)
   table.insert(Users[msg.Tags.username].follower,Users[msg.From].username)
   table.insert(Users[msg.Tags.username].notification,{data="follow",username = Users[msg.From].username, seen =false})
   local result = string.format(json.encode({status = 1, data = "Followed"}))
   Handlers.utils.reply(result)(msg)
end)

Handlers.add("search",Handlers.utils.hasMatchingTag("Action","search"), function (msg)
   local json = require("json")
   if (Users[msg.From] == nil) then
    local result = string.format(json.encode({status = 0, data = "Account is not Register"}))
    Handlers.utils.reply(result)(msg)
    return
   end
   assert(type(msg.Tags.param) == "string" and msg.Tags.param ~= nil,"param is missing")
   local utils = require(".utils")
   local tmp_user = Search(msg.Tags.param)
    if tmp_user ~= "[]" then
        local send_user = {}
        for i = 1, #tmp_user do
            table.insert(send_user,{username = tmp_user[i].username, name = tmp_user[i].name, image = tmp_user[i].image})
        end
        local result = string.format(json.encode({status = 1, data = Preprocess_data(send_user)}))
        Handlers.utils.reply(result)(msg)
        return
    end
    local result = string.format(json.encode({status = 0, data = "No User"}))
    Handlers.utils.reply(result)(msg)
end)