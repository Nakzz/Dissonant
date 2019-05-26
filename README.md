# Dissonant	
Web Dev Repo for Dissonant Magazine	

 Refer to these tutorial for more help: 
 - https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website	
 - https://www.youtube.com/watch?v=oLGiSBy7u68

 ## Instructions for development	
1. Clone repo	
2. Run `npm install`	
3. Run `nodemon` or `npm run devstart` . 

`nodemon` watches the files for changes and refreshes where as `npm run devstart` should incorporate SASS compiling using Gulp. But current isn't working. Issue has been created. 

## Instruction for Realtime developing
- Run `nodemon` in root directory 

 This setup will automatically save the files as you save files (only nodejs files, not styles or javascript).	


## Server Deployment
In the server, the node process is monitored used pm2 process manager. Use the following command to 
   <br/> <br/> List the process
   - `pm2 list`
   
   Stop a process
   - `pm2 stop [id]`
   
   Start a process
   - `pm2 start npm -- start`

 ## Getting Help 	
Email: naqib@wisc.edu
