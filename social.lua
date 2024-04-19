Users = Users or {}

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