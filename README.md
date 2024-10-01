# circloO-music-script

This repository holds the script I used to create MEGALOVANIA in circloO. Its super basic and not really made to be super user friendly, but it works so I figured I might as well share it. This includes both the `index.js` file which is responsible for building the level and parsing the music files, as well as the source I used for MEGALOVANIA in the form of `.mus` files.

# Running

Make sure you have NodeJS 16 or higher (i havent tested below 16) and run `node index <filename>` to compile a script into a level. If no file name is specified, it will automatically look for a `main.mus`

# `.mus` files

These files hold commands for the music you write. Technically they can have any file extension, but thats not as cool. Commands are as follows:

## `//`

This is a comment. The script will ignore everything that comes after it. You MUST separate the `//` from the actual comment with a space, otherwise it will treat it as a note.

## `size <circles>`

This sets the size of the level. By default, it's size is set to 20 circles big, double the in-game maximium.

## `measure <pixels>`

Sets the length of a "measure" in pixels.

## `scale <scale>`

Sets the scale to build the level at. Changing this requires you change gravity as well for the song to still sound correct. This is typically used when patterns aren't small enough for a loop to be fully achieved, because the triggers don't deactivate until the falling object quits colliding with them.

## `grav <amount>`

Sets the gravity of the level. This controls the speed of the song. At a scale of 2 and a gravity of 0.14, each pixel corresponds to a quarter note in a song going 240bpm

## `new [x] [y]`

Creates a new pattern column at the specified x and y coordinates. You can leave out the coordinates and just put `new`, and the column will be automatically placed 50 pixels to the right of the previous one.

## `trigger [pixels] [measures]`

Sets a falling block to run through the current column after the specified pixels/measures. There might be something wrong with the pixels parameter, I never used it though so I have no idea. You can just put a `trigger` by itself to run the pattern column instantly.

## `push`

Pushes the current position in the song to a stack.

## `pop`

Pops the current position in the pattern column from the stack and warps to it. Using in combination with `push` can allow you to create multiple melodies that overlap on a single pattern column.

## `d <pixels>`

Delays/shifts the current position in the pattern column by the specified amount of pixels.

## `p <pixels>`

Sets the current position in the pattern column to the specified amount of pixels.

## `use <filepath>`

Inserts another file's commands directly where this command is located and moves the position to the end of the included notes. Good for splitting pattern columns up into their own individual files. The file path cannot contain a space.

## `from <filepath>`

Inserts another file's commands directly where this command is located, however keeps the position where it was before inserting. Good for overlapping multiple files to create one pattern column, though I would recommend just using multiple `trigger`s if you wind up doing this a lot since lots of collectables in a level can cause a bunch of lag (MEGALOVANIA was up to 600 objects total). The file path cannot contain a space.

## `end <pixels> <measures>`

Inserts an end column and auto schedules it to trigger after the specified pixels and measures. This automatically ends the level. Make sure to press left or right before the automatic end of a level, otherwise the game will complain that the level is too short and not let you upload it.

## Notes

If no command is detected, the script will assume you are placing notes. To use a note, simply prefix it with the amount of pixels to delay it by, and use the instrument name and variant. For example, to play a piano sound on G4 (variant 31) after 10 pixels, you would write:
```
10 piano31
```
