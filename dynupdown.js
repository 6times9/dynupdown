// =================================================
//     Dynupdown:  A Countup and Countdown Timer
// =================================================
//           Version "India"  (2010-12-25)
//
//  http://www.6times9.com/javascript-php/dynupdown
//
//          Copyright 2006 Richard Winskill
// =================================================

var months=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan")
var msecondssecond=(1000) //Number of milliseconds in a second
var msecondsminute=(msecondssecond*60) //Number of milliseconds in a minute
var msecondshour=(msecondsminute*60) //Number of milliseconds in a hour
var msecondsday=(msecondshour*24) //Number of milliseconds in a day
var msecondsweek=(msecondsday*7) //Number of milliseconds in a week
var averagemonthdays=(365.25/12)  //Average number of days in a month since it varies from 28 to 31
var msecondsmonth=(msecondsday*averagemonthdays) //Average number of milliseconds in a month
var msecondsyear=(msecondsmonth*12) //Number of milliseconds in a year

function start_counter(hr, mn, sc, mo, da, year, dir, beforetext, aftertext, eventname, compact, countername, notyears){
	if(!document.getElementById(countername)){document.write('<span id="'+countername+'" class="dynupdown"><\/span>')}
	new_counter(hr, mn, sc, mo, da, year, dir, beforetext, aftertext, eventname, compact, countername, notyears)
}

function zerotime(comp, prevperiod, value, singular, plural){
	//Function to determine whether or not a specific period (days, months, etc.) should be displayed if it is zero.
	if((comp=="yes" && prevperiod=="" && value==0) || (comp=="strict" && value==0)){ outperiod=""
	} else if(value==1){ outperiod=" "+value+ " "+singular+", "
	} else { outperiod=" "+value+ " "+plural+", "}
	return outperiod
}

function new_counter(hr, mn, sc, mo, da, year, dir, beforetext, aftertext, eventname, compact, countername, notyears){
	//Get current time
	var today=new Date()
	var todayy=today.getYear()
	if (todayy < 1000){todayy+=1900}
	var todaym=today.getMonth()
	var todayd=today.getDate()
	var todayh=today.getHours()
	var todaymin=today.getMinutes()
	var todaysec=today.getSeconds()
	
	//A space after "seconds" only if there's aftertext
	if(aftertext){secondspace=" "}else{secondspace=""}
	
	//Preset output for laziness
	outyear=""; outmonth=""; outweek=""; outday=""; outhour=""; outminute=""; secondand=""; outsecond=""; switchword=""; notyearserror=0;
	
	//Handle annual events
	if (year=="all"){yr=todayy} else {yr=year}
	
	//Create and parse strings of the dates
	todayparse=Date.parse(months[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec)
	dateparse=Date.parse(months[mo-1]+" "+da+", "+yr+" "+hr+":"+mn+":"+sc)
	
	//Handle switched directions
	if(dir=="switch" && (dateparse>todayparse)){
		countdir="down"
		if(aftertext==""){switchword=""}else{switchword="to "}
	} else if(dir=="switch" && (dateparse<todayparse)){
		countdir="up"
		if(aftertext==""){switchword=""}else{switchword="since "}
	} else if(dir=="switch" && (dateparse==todayparse)){
		countdir="down"
		if(aftertext==""){switchword=""}else{switchword="to "}
	} else {
		countdir=dir
		switchword=""
	}
	
	//Handle annual events again
	if(countdir=="down"){predd=dateparse-todayparse} else {predd=todayparse-dateparse}
	if (predd<0 && year=="all"){yr=todayy+1; dateparse=Date.parse(datestring=months[mo-1]+" "+da+", "+yr+" "+hr+":"+mn+":"+sc)}

	//Calculate difference based in set direction
	if(countdir=="down"){
		dd=dateparse-todayparse
		timeupmsg=eventname+" has passed"
	} else {
		dd=todayparse-dateparse
		timeupmsg=eventname+" is in the future"
	}
	
	//Handle elapsed time
	if(dd<0){notime=1}else{notime=0}

	//
	//CALCULATE TIMES
	//
	if(notyears==0){
		//Including Years and Months
		if(countdir=="up"){
			//Countup
			//YEAR
			dyear=todayy-yr
			if(todayparse<Date.parse(months[mo-1]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)){dyear=dyear-1}
			outyear=zerotime(compact, 0, dyear, "year", "years")
			//MONTH
			if(todaym==(mo-1)){
				//In target month
				if(todayparse<Date.parse(months[todaym]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)){
					//Before target time
					dmonth=11 //By logic
				}else{
					//After target time
					dmonth=0 //Again: logic
				}
			}else if(todaym<(mo-1)){
				//Earlier month
				dmonth=todaym+12-(mo-1)
				if(todayparse<Date.parse(months[todaym]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)){dmonth=dmonth-1}
			}else{
				//Later month
				dmonth=todaym-(mo-1)
				if(todayparse<Date.parse(months[todaym]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)){dmonth=dmonth-1}
			}
			outmonth=zerotime(compact, outyear, dmonth, "month", "months")
			//TIME DIFFERENCE FOR DAYS, ETC.
			if(todayparse<Date.parse(months[todaym]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)){
				//Before target time
				if(todaym==0){
					//If the current month is January, there isn't a previous month to subtract to automatically...
					dd=todayparse-Date.parse(months[11]+" "+da+", "+(todayy-1)+" "+hr+":"+mn+":"+sc)
				}else{
					dd=todayparse-Date.parse(months[todaym-1]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)
				}
			}else{
				//After target time
				dd=todayparse-Date.parse(months[todaym]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)
			}
		}else{
			//Countdown
			//YEAR
			dyear=yr-todayy
			if(todayparse>Date.parse(months[mo-1]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)){dyear=dyear-1}
			outyear=zerotime(compact, 0, dyear, "year", "years")
			//MONTH
			if(todaym==(mo-1)){
				//In target month
				if(todayparse<Date.parse(months[todaym]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)){
					//Before target time
					dmonth=0 //By logic
				}else{
					//After target time
					dmonth=11 //Again: logic
				}
			}else if(todaym<(mo-1)){
				//Earlier month
				dmonth=(mo-1)-todaym
				if(todayparse>Date.parse(months[todaym]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)){dmonth=dmonth-1}
			}else{
				//Later month
				dmonth=(mo-1)+12-todaym
				if(todayparse>Date.parse(months[todaym]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)){dmonth=dmonth-1}
			}
			outmonth=zerotime(compact, outyear, dmonth, "month", "months")
			//TIME DIFFERENCE FOR DAYS, ETC.
			if(todayparse<Date.parse(months[todaym]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)){
				//Before target time
				dd=Date.parse(months[todaym]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)-todayparse
			}else{
				//After target time
				if(todaym==11){todayy=todayy+1}
				dd=Date.parse(months[todaym+1]+" "+da+", "+todayy+" "+hr+":"+mn+":"+sc)-todayparse
			}
		}
		//DAYS etc.
		dday=Math.floor(dd/msecondsday)
		dhour=Math.floor((dd-(dday*msecondsday))/msecondshour)
		dminute=Math.floor((dd-(dday*msecondsday)-(dhour*msecondshour))/msecondsminute)
		dsecond=Math.floor((dd-(dday*msecondsday)-(dhour*msecondshour)-(dminute*msecondsminute))/msecondssecond)
		outday=zerotime(compact, outmonth, dday, "day", "days")
		outhour=zerotime(compact, outday, dhour, "hour", "hours")
		outminute=zerotime(compact, outhour, dminute, "minute", "minutes")
		//SECONDS
		if(dsecond==1){outsecond=dsecond+" second"}else{outsecond=dsecond+" seconds"}
		if(dateparse==todayparse){
			//Bodge for zero time for "switch"
			outyear=zerotime(compact, 0, 0, "year", "years")
			outmonth=zerotime(compact, outyear, 0, "month", "months")
			outday=zerotime(compact, outmonth, 0, "day", "days")
			outhour=zerotime(compact, outday, 0, "hour", "hours")
			outminute=zerotime(compact, outhour, 0, "minute", "minutes")
		}
		if(outyear=="" && outmonth=="" && outday=="" && outhour=="" && outminute==""){secondand=" "}else{secondand="and "}
	}else if(notyears==1){
		//Just Days
		dday=Math.floor(dd/msecondsday)
		dhour=Math.floor((dd-(dday*msecondsday))/msecondshour)
		dminute=Math.floor((dd-(dday*msecondsday)-(dhour*msecondshour))/msecondsminute)
		dsecond=Math.floor((dd-(dday*msecondsday)-(dhour*msecondshour)-(dminute*msecondsminute))/msecondssecond)
		outday=zerotime(compact, 0, dday, "day", "days")
		outhour=zerotime(compact, outday, dhour, "hour", "hours")
		outminute=zerotime(compact, outhour, dminute, "minute", "minutes")
		//SECONDS
		if(dsecond==1){outsecond=dsecond+" second"}else{outsecond=dsecond+" seconds"}
		if(outyear=="" && outmonth=="" && outday=="" && outhour=="" && outminute==""){secondand=" "}else{secondand="and "}
	}else if(notyears==2){
		//Including Weeks
		dweek=Math.floor(dd/msecondsweek)
		dday=Math.floor((dd-(dweek*msecondsweek))/msecondsday)
		dhour=Math.floor((dd-(dweek*msecondsweek)-(dday*msecondsday))/msecondshour)
		dminute=Math.floor((dd-(dweek*msecondsweek)-(dday*msecondsday)-(dhour*msecondshour))/msecondsminute)
		dsecond=Math.floor((dd-(dweek*msecondsweek)-(dday*msecondsday)-(dhour*msecondshour)-(dminute*msecondsminute))/msecondssecond)
		outweek=zerotime(compact, 0, dweek, "week", "weeks")
		outday=zerotime(compact, outweek, dday, "day", "days")
		outhour=zerotime(compact, outday, dhour, "hour", "hours")
		outminute=zerotime(compact, outhour, dminute, "minute", "minutes")
		//SECONDS
		if(dsecond==1){outsecond=dsecond+" second"}else{outsecond=dsecond+" seconds"}
		if(outyear=="" && outmonth=="" && outday=="" && outhour=="" && outminute==""){secondand=" "}else{secondand="and "}
	}else{
		notyearserror=1
	}
	
	//
	//OUTPUT
	//
	
	if(notime){
		document.getElementById(countername).className="dynupdown elapsed"
		document.getElementById(countername).innerHTML=timeupmsg
	}else if(notyearserror){
		document.getElementById(countername).innerHTML="Error: Invalid value for NOTYEARS"
	}else{
		document.getElementById(countername).innerHTML=beforetext+outyear+outmonth+outweek+outday+outhour+outminute+secondand+outsecond+secondspace+switchword+aftertext
	}
	
	//
	//REPEAT
	//

	setTimeout('new_counter("'+hr+'", "'+mn+'", "'+sc+'", "'+mo+'", "'+da+'", "'+year+'", "'+dir+'", "'+beforetext+'", "'+aftertext+'", "'+eventname+'", "'+compact+'", "'+countername+'", "'+notyears+'")',1000)
}
