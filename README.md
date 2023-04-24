# UXPScriptSparker

  *** Note: this is work-in-progress. Documentation is quite incomplete.

--

Starter project for running and debugging UXPScript with Adobe InDesign and the 
Adobe UXP Debugger Tool

© 2023, Rorohiko Ltd. - Kris Coppieters
kris@rorohiko.com

v1.0.0, Apr 21, 2023

## Preamble

UXPScriptSparker is a tool for learning and using UXPScript in Adobe InDesign. 

It allows for the creation of reusable code that can run in both ExtendScript
and UXPScript. 

The tool includes two scaffolding sets, one for ExtendScript and one for 
UXPScript, as well as shared APIs that work in both environments. 
The script contains one or more .js files that can be executed in either 
environment.

The goal of this project is to reduce the treshold to 'get started' writing
and debugging UXPScript scripts.

The approach I've taken is to provide you with a ready-to-run script with all its 
source code.

In addition, there is a lot of developer infrastructure code (helpers scripts) 
which help with tasks like installing, debugging, reading log files...

Most of the helper scripts are human-readable command line scripts (.command on 
Mac, .bat on Windows). 

These helpers are all written in such a way that they are easy to inspect and analyze. 
They also serve as a way to explain and document the development processes.
 
I know from experience how disheartening it is to find some useful sample code, 
and then get mired into all kinds of issues trying to install various tools 
that are needed in order to get a simple bit of sample code to run.

To avoid that, I've also tried my best to keep external dependencies 
to the absolute minimum.

This package should allow you to get going with the following minimal 
dependencies:

- Mac OS X 13.0 or Windows 11.x or higher
- Adobe InDesign 2023 or higher
- Adobe UXP Debugger Tool

Make sure to consult the [UXPScriptSparker Documentation](https://github.com/zwettemaan/UXPScriptSparker/wiki)

This project uses the Sparker application. More info here: https://github.com/zwettemaan/Sparker
