---
title: bash
subtitle: bourne-again shell
image: bash.svg
---

## shells

| shells | | |
| ----------- | ----------- | ----------- |
| sh | The original Bourne shell | Present on every unix system |
| ksh | Original Korn shell | Richer shell programming environment than sh |
| csh | Original C-shell | C-like syntax; early versions buggy |
| tcsh | Enhanced C-shell | User-friendly and less buggy csh implementation |
| bash | GNU Bourne-again shell | Enhanced and free sh implementation |
| zsh | Z shell | Enhanced, user-friendly ksh-like shell |
| fish | ??? | |

```bash
--------- TERMINAL MOUVEMENT ----------
#mouvement macros inspired by emacs
ctrl+a #goes to beginning of the line
ctrl+e #goes to end of the line
ctrl+r #search past command
ctrl+shift+{x,c,v} #cut, copy, pastr
ctrl+u #clear line
ctrl+k #clear from cursor to end
ctrl+w #delete word
ctrl+c #cancel
ctrl+z #suspend, resume with fg

#esc in Mac, meta otherwise
esc+h #run-help of current written command
esc+right_arrow #move forward by a word

--------- VARIABLES -------
? #stores the status code of last terminated program (0 for succes, i>=1 for error)
SHELL
PROMPT_DIRTRIM
CPLUS_INCLUDE_PATH
USER
HOSTNAME

--------- BASHRC ---------- 
#for colors cf. ANSI escape: eg. \e[1;31;24mA\e[0m
#use Caskaydia (from Nerd fonts) for special characters

${PWD##*/} #to remove whole path
${PWD%%/*} #to keep only root directory
${PWD#*/} #to remove root directory (and keep the rest of the path)
${PWD%/*} #to remove the file (and keep the whole path)


alias {gstat,gs}='git status'
# . is an alias for source
# source file.sh excute with current session / bash file.sh execute in a new session


--------- TERMINAL COMMANDS ----------
... | grep <keyword> #print only the lines where the keyword appears
... | less #navigate through stdout with space/b/q 
... | tail #last 10 lines
find -name "full_name_of_file.extension"
rename --help


????????????????????????????????
df -h
du -h -d 1 .
du -sh *
ln -s
less / more ?
export #add something to the tail of the variable? export PATH=something ???
$ sh vs. $ source
kill ??
history

cmd1 | cmd2 ; cmd2 $(cmd1) #difference ?



--------- DNF ---------
dnf list --installed | grep <package_name>
rename abc ABC * #replace abc by ABC in all file names in the current directory
sudo dnf whatprovides <C_header_name>

--------- SCRIPTS ---------
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```

## Terminology
```bash
$ command -flag/option argument/stdin
output/stdout
```

## Pipeline
```bash
command > output.txt #rewrite output.txt with command ouput
command >> output.txt #append command output in output.txt
command1 | command2 #pass command1 output as command2 argument
#command < input.txt #?
```


## File manipulation
```bash
cat file.txt #print file.txt content

wc file.txt #print line word character counts and filename
wc -l file.txt #print line count

sort file.txt #print file.txt after alphabetical sort
sort -n file.txt #print file.txt after numerical sort
sort -t, -k2 file.csv #print file.txt after alphabetical sort of the second comma separated column

head -n 1 file.txt #print first line
tail -n 2 file.txt #print last 2 lines
tail -n +2 file.txt #print lines 2 to last
head -14 file.txt | tail +14 #print 14th line
sed -n '10,14p' file.text #print lines 10 to 14 included

cut -f 1 file.tsv #print first column of tab separated values
cut -d , -f 2 file.csv #print second column of comma separated values

uniq -c text.txt #print occurrence number of each line and line in order of appearance
```


## Loops
```bash
for in ;do ;done
```




```bash
uname -m
```

```bash
cd -
```