# Comments

As 'common sense' login was form behaviour was requested, I've opted in to also implement a very simple validation whether inputs are empty.

I wasn't sure if additional files were allowed for Part 1 of the task, but if they were and we were going for the possibility of having more input fields, it would probably be a good idea to create an inputConfig object passed as a props to the form, which we could then map through in order to render input components. The inputContainer would then be its' own component, which in effect would keep things DRY and allow for more flexibility.

The feature of focusing password input on "enter" if email input is focused is currently not scalable beyond two inputs. If that was required, I would perhaps store refs in an array and focus based on the current refs' position in the array.

The logic of handleSubmit, handleChange etc. is currently handled in the parent component, mostly to allow for better flexibility.

# Thoughts

Thank you so much for the opportunity to take part in the interview process!

It was a fun and fairly quick task, yet it certainly taught me something - as usual. I've never worked with prop-types before, but as I understood the idea - I believe my TypeScript knowledge translated well into working with this library, despite them both having different purposes. Also - it's been a long time since I used SASS and I'm certainly glad I got an opportunity to work with it again.

# Hope to hear from you soon!
