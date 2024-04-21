Users = Users or {}
Post = Post or {}

function Username_exists(username)
    for key, value in pairs(Users) do
       for field, val in pairs(value) do
            if field == "username" and val == username then
                return true
            end
        end
    end
    return false
end

Handlers.add('check_user_exist',Handlers.utils.hasMatchingTag("Action","check_user_exist"), function (msg)
    local json = require('json')
    if Users[msg.From] ~= nil then
        local result = string.format(json.encode({status = 1, data = Users[msg.From]}))
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
    local result = string.format(json.encode({status = 1, data = "Account Registered"}))
    Handlers.utils.reply(result)(msg)
end)

Handlers.add('get',Handlers.utils.hasMatchingTag("Action","get"), function (msg)
    local json = require('json')
    if(Users[msg.From] ~= nil) then
        local user = Users[msg.From]
        local result = string.format(json.encode({status = 1, data = {username = user.username, name = user.name, image = user.image}}))
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
                    local result = string.format(json.encode({status = 1, data = {username = value.username, name = value.name, image = value.image}}))
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
       local result = string.format(json.encode({status = 1, data = "Post Commented"}))
       Handlers.utils.reply(result)(msg)
       return
    else
        local result = string.format(json.encode({status = 0, data = "No Post"}))
        Handlers.utils.reply(result)(msg)
        return
    end
end)