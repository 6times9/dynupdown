#dynupdown

##About

A dynamic and accurate JavaScript countup and countdown timer.

###Features

* Multiple different timers can appear on the same page.
* Can be set to count down to a date, count up from it, or count down and then change to count up after it passes.
* Year, month, day, hour, minute, and second can be specified and are displayed in the counter.
* Can handle annual events; it will automatically update its working year.
* Text can be specified to appear before and after the counter.
* It can be set not to display times that are zero (i.e. "0 years, 1 month, etc." will become just "1 month, etc.").
* It can include years and months (for a more intuitive time, which as of version Echo is now actually accurate), it can start with weeks (e.g. "34 weeks, 6 days, etc."), or it can just start with days (e.g. "730 days, 0 hours, 0 minutes, 0 seconds" instead of "2 years, 0 months, 0 days, etc.").
* The CLASS of the &lt;span&gt; changes when the time is reached, allowing for a distinct style for an elapsed timer.
* Supports arbitrary singular and plural names for the time periods (but this does involve slightly more in-depth code editing than just setting up a counter, unfortunately), which allows for languages that don't make plurals by simply adding an "s".

Previously Dynupdown itself would generate the &lt;span&gt; into which it places the timer, but as of version Hotel you can manually place a &lt;span&gt; with the appropriate ID before the call to start the timer and Dynupdown will detect it and not output its own &lt;span&gt;. This allows you to put a message (such as a static time calculated with PHP) in the &lt;span&gt; for situations where the user doesn't have JavaScript.

###Years and Months

Versions Alpha, Bravo, Charlie, and Delta subtracted the current time and target time and then calculated the number of years, months, days etc. purely mathematically; i.e. I approximated "a year" to 365.25 days (this covers leap years) and approximated "a month" to a twelfth of the "year" value. I then divided the difference by each length from year to minute to find the number of each. Because the larger periods were calculated first, and years and months were approximations, this inaccuracy carried down to the smaller, definite periods (e.g. a day never varies, but a month can be 28, 29, 30, or 31 days). This meant that any time that displayed "1 month" or longer was progressively less accurate as the time increased.

However, as of version Echo (2007-10-08) this is no longer the case!

After many headaches, much giving up and having to restart because it had been too long, and some cursing at how simple it turned out to be compared to all the effort I put in, I have managed to get Dynupdown to calculate years and months as a human would; it no longer looks at the entire period (between now and the target) but instead just looks at the years to find the number of them, then moves on to the months. This means that, allowing for inaccuracy in the user's computer's clock, Dynupdown is now theoretically perfectly accurate when displaying years and months! (The options for weeks and just days were never a problem because those periods are all clearly defined).

I should point out that there are many cases in which to test this new system, and I haven't been able to test them all, so if you notice any errors, I'd appreciate being told so I can try to fix them.

##Using
First put

    <script src="dynupdown.js" type="text/javascript"></script>

in the &lt;head&gt; section, and then place

    <script type="text/javascript">start_counter(hour, minute, second, month, day, year, direction, beforetext, aftertext, eventname, compact, countername, notyears)</script>

wherever you want a timer to appear, editing it as appropriate. The configuration values are:

* hour - The hour of the target event in 24-hour format (3am=3, 3pm=15, etc.). Entered as just a number with no quotation marks.
* minute - The minute of the target event (0 to 59). Entered as just a number with no quotation marks.
* second - The second of the target event (0 to 59). Entered as just a number with no quotation marks.
* month - The month of the target event (January=1, February=2, etc.). Entered as just a number with no quotation marks.
* day - The day of the month of the target event (1 to 28, 29, 30, or 31 depending on the month). Entered as just a number with no * quotation marks.
* year - The year of the target event with all four digits (i.e. 1999 not 99). If you wish to have an annual event, enter "all" (with quotation marks) instead of a number.
* direction - The direction of the counter: "down" for countdown, "up" for countup, or "switch" to countdown then up (all with quotation marks).
* beforetext - The text to appear before the counter, enclosed in quotation marks and without a final space (i.e. "There is" not "There is ").
* aftertext - The text to appear after the counter, enclosed in quotation marks and without a leading space (i.e. "until the event" not " until the event").
* eventname - The name of the event, to be displayed after the time has elapsed, enclosed in quotation marks. It will be followed by " has passed", so set something like "The event" not "The event has passed".
* compact - Whether or not to hide periods that are zero. Can be "yes", "no", or "strict" (all with quotation marks). With "yes", "0 years, 1 month, 0 days, 1 minute, etc." will become "1 month, 0 days, 1 minute, etc."; with "strict" "0 years, 1 month, 0 days, 1 minute, etc." will become "1 month, 1 minute, etc.".
* countername - The id for the span automatically generated by the script for the output. This must be different for each counter on a page.
* notyears - Added in version Bravo, updated in version Delta. Set as 0 for "Years, Months, Days, Hours, Minutes, Seconds" (Example "Countup with Years & Months" above), set as 1 for "Days, Hours, Minutes, Seconds" (Example "Countup with Days" above), set as 2 for "Weeks, Days, Hours, Minutes, Seconds" (Example "Countup with Weeks" above).

For example, a countdown to New Year's Day is generated using

    <script type="text/javascript">start_counter(0, 0, 0, 1, 1, "all", "down", "", "to the next New Year's Day.", "New Year's Day", "yes", "newyear", 0)</script>

and the a countup from the year 2000 is generated using

    <script type="text/javascript">start_counter(0, 0, 0, 1, 1, 2000, "up", "", "since the turn of the century.", "2000", "yes", "century", 0)</script>

##Styling

The CLASS of the SPAN is "dynupdown" by default. The CLASS changes to "dynupdown elapsed" when the timer runs out. CSS can be applied to these classes in the normal way.
