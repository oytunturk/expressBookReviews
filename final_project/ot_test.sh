curl -X POST localhost:5000 -H 'Content-Type: application/json' -d '{"username":"newuser","password":"newpass"}'

curl -X PUT localhost:5000/auth/review/1 -H 'Content-Type: application/json' -d '{"reviews":{"this is a great book"}}'

curl -X GET localhost:5000 -d '{"title"="The Book Of Job"}'
