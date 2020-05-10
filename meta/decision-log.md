
2018-05-10

Decided not to create 'exports' property in the template returned by 'tpl' function. Creating the
exports property in 'tpl' requires us to know which of the placeholders are templates and wait for them.

This causes problems because we can't tell which placeholders are templates until they complete, and so
we can't know whether we have ALL the templates in placeholders until ALL promises complete.

Instead, we can make refs a proxy object created by the spec function that allows () => my.ref syntax to
look up a particular symbol's containing file and import it, given the location of the requesting template.

The location of the requesting template can be passed into the generate function.

