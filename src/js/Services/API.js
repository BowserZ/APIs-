/*Odiamos React*/
/* Create user with Post /users/{user_name} https://playground.4geeks.com/todo/users/Mi-Gochita*/


export async function createUser(nombre) {
    let URL = `https://playground.4geeks.com/todo/users/${nombre}/`
    await fetch(URL, {method:"post"})
}
/*https://playground.4geeks.com/todo/todos/newValuexd2345*/

/**/
/**/
/**/
/**/
/**/
/**/