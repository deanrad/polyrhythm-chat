Compared to Redux Observable:

Dependencies

- Usable without Redux
- Smaller Poly size: 2.3Kb - Redux+R/O: Kb

Defining 'epics'

- Can Match on actions with Regex, predicate— not just string
- Easier to not get into endless loop

Timing
- Can preempt reduction into the store

Component co-location
- Can do direct manipulation of state in response (not just more actions)

Readability
- Configurable mode strings, not operator chains in code
- No need to use `{ type: ''...` boilerplate - trigger is cleaner