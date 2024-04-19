Users = Users or {}

function IsUser(msg)
    return Users[msg]
end

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
    if IsUser(msg.From) ~= nil then
        local result = string.format(json.encode({status = 1, data = IsUser(msg.From)}))
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
