# Vim

### Save read-only edited in vi/vim

```text
w !sudo tee %
What the command does:
:w = Write a file.
!sudo = Call shell sudo command.
tee = The output of the vi/vim write command is redirected using tee.
% = Triggers the use of the current filename.
Simply put, the ‘tee’ command is run as sudo and follows the vi/vim command on the current filename given.
```

