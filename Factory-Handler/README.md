## What is this?
A handler factory function documents from all the other collections,with one simple function.
Adding very similar handlers to all of your controlles,will create a lot of duplicate code,right?All this 
create handlers, post handlers, update handlers , or all this delete handlers, they really all just
look basically the same , right? Also imagine that we wanted to change, like some https status code or
status message, then we would have to go into each and every contollers, and then change all the handlers in there and so , instead of manually writing all these handlers why not simply create a factory function that's gonna return these handlers for us.So a factory function is exactly that it's a function that returns another function
and is this case our handler function , so for deleting , for updating , for creating, and for reading resources.