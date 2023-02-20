# Ultra light http router work only with decorators

### Exemple
```typescript
import Route from './route'
import Method from './method'
import {Req, Res} from './type'

@Route('/users')
class Users {

  users: object[] = []

  @Method('PUT', '/:id')
  editUsers(req: Req, res: Res) {
    res.write(JSON.stringify(req))
    return res.end()
  }

  @Method('POST')
  addUsers(req : Req, res: Res) {
    this.users.push(req.body)
    res.write(JSON.stringify(req.body))
    return res.end()
  }
  
  @Method('GET')
  getUsers(req : Req, res: Res) {
    res.write(JSON.stringify(this.users))
    return res.end()
  }
}
```

```bash
curl --location --request POST '127.0.0.1:8081/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@test.fr", "password": "test", "name": "test"
}'
```

```bash
curl --location --request GET '127.0.0.1:8081/users'
[{"email": "test@test.fr", "password": "test", "name": "test"}]
```