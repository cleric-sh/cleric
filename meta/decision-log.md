
2018-05-10

Decided not to create 'exports' property in the template returned by 'tpl' function. Creating the
exports property in 'tpl' requires us to know which of the placeholders are templates and wait for them.

This causes problems because we can't tell which placeholders are templates until they complete, and so
we can't know whether we have ALL the templates in placeholders until ALL promises complete.

Instead, we can make refs a proxy object created by the spec function that allows () => my.ref syntax to
look up a particular symbol's containing file and import it, given the location of the requesting template.

The location of the requesting template can be passed into the generate function.

---

Decided to implement ImportsOf without requiring the ExportsOf type. Refactored to Refs and SpecExports types,
since 'importing' is just one things we might want to do with a ref.

---

I need to replace the behavior of 'file' with 'tpl'. However, 'tpl' returns a Template, where 'file' used to 
return a string. Generators like json act on the string returned from 'file'. However, we don't get the string
immediately any more, because we are deferring generating the string until later, e.g. when refs has been created.

In order to allow 'file' to check the generated string against schemas, or run formatting etc, we need to 
be able to extend the generate function. 

Wrapping and re-allocating the returned generated function from 'tpl' is messy and annoying. In this case,
classes and inheritence might be the nicest API, allowing us to implement a new Template type for different 
handling the pre/post processing of different content types.

'tpl' could allow passing a Template constructor as an argument, causing the function to curry, using the specified
Template constructor instead of the default one. The extended Template could call super.generate and wrap the results
as needed, possibly also augmenting the TemplateStringsArray and placeholders.