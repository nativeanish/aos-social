local json = require("json")
-- 
Users = Users or {}
-- function Add ()
--     Users["anish"] = {}
--     Users["anish"].name = "Anish Gupta"
--     Users["anish"].username = "nativeanish"
--     Users["anish"].photo =  "google.com"
-- end
-- Add()
-- function Show()
--     Users["anish"].articles = {}
--     Users["anish"].articles["a"] = "b"
--     Users["anish"].articles["c"] = "d"
--     print(Users["anish"].articles["a"])
--     -- for key, value in pairs(Users) do
--     --     for k, v in pairs(value) do
--     --         if k == "articles" then
--     --             for mars, vue in pairs(v) do
--     --                print(mars,vue)
--     --             end
--     --         else
--     --             print(k,v)
--     --         end
--     --        print(k,v)
--     --     end
--     -- end
--     -- print(Users["anish"].articles)
--     local a = #Users["anish"].articles
-- end
-- Show()

-- local Users = {}
-- table.insert(Users,{title = "Hello world",descritpion = "fasdfdfa",number = 32})
-- table.insert(Users,{title = "Hello world1",descritpion = "darksd",number = 33})
-- table.insert(Users,{title = "Hello world2",descritpion = "darksd3",number = 34})
-- for key, value in pairs(Users) do
--     for field, val in pairs(value) do
--         print(field,val)
--     end
-- end
local users = {
  { name = "anish", age = 50, id = 1 },
  { name = "Victor", age = 37, id = 2 },
  { name = "anish", age = 33 , id = 3}
}
local utils = require("utils")
local m = (json.encode(utils.filter(function (val)
    return val.name == "anish"
end,users)))
print(m)
print(m == "[]")