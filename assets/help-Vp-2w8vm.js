import{r as e,t}from"./preview-lBuFJwfn.js";var n=`---
title: Connect a coding agent
section: Coding agents
order: 1
summary: Let Claude Code, Codex or another MCP agent search and read your notes and propose edits that you review.
---

# Connect a coding agent

Margin can serve your notes to a coding agent such as Claude Code or Codex, over the Model Context Protocol (MCP) or a command line. The agent can search and read your notes. Every edit it makes arrives as a proposal, and nothing reaches a file until you accept it. The connection stays on your Mac, and Margin [opens no network port](privacy.md#when-margin-goes-online).

## Turn on Agents

1. Press ⌘, and open the [Agents pane](settings.md#agents).
2. Turn on the switch.

Agents is off until you turn it on. While it is off, an agent's requests get an answer that says so.

The switch is not a security boundary. Your notes are plain files, and an agent can read them from disk with no connection at all. What the connection adds is search, structure and edits you review.

## Connect Claude Code, Codex or another MCP client

1. In the Agents pane, click the copy button for your agent: Claude Code, Codex, or any MCP client.
2. Paste the setup where your agent's documentation says to add an MCP server.

The setup starts the \`margin\` command, which [Homebrew put on your PATH](install.md#install-with-homebrew), as \`margin mcp\`. If Margin is not running when the agent starts, the command starts it in the background.

## What an agent can do

An agent has six tools, the same over MCP and the command line. The first four only read, so most agents run them without asking you.

| Tool | What it does |
| --- | --- |
| \`search_notes\` | Searches your notes and returns each match's path, title and snippet, up to 50 notes |
| \`list_notes\` | Lists every note's path and title, in one folder or all of them |
| \`read_note\` | Returns a note's text |
| \`outline\` | Returns a note's headings |
| \`propose_edit\` | Proposes replacing one piece of text in a note, with a reason |
| \`propose_note\` | Proposes a new note with a title, text, a reason and an optional folder |

A \`propose_edit\` must name text that appears exactly once in the note. Otherwise the answer is \`stale\`, and the agent reads the note again.

## Use the margin command

For an agent without MCP, each \`margin\` command makes one tool call and prints JSON:

\`\`\`sh
margin search <words>
margin list [folder]
margin read <path>
margin outline <path>
margin propose <path> --find <text> --replace <text> --why <text>
margin propose --new --title <text> --why <text> [--folder <folder>] < text
\`\`\`

A failure prints \`margin: <reason>\` and exits with status 1. A message can be up to 8 MB each way, so a longer note fails with that reason.

## Review what an agent proposes

When proposals wait, a button in the editor's [footer](window-tour.md#the-footer) says how many. Click it, or press ⌘J and choose Review Agent Proposals.

Proposals open in the same review as [Change Across Notes](ai-across-notes.md#change-several-notes-at-once). Accept or reject each hunk or each note. Click Cancel to keep them for later, or Reject All to drop them.

- A second edit from the same agent to the same note builds on its first, so you review each note once.
- A proposed new note never lands on a path that already exists.
- Margin holds up to 50 proposals and 64 MB. [Switching to another notes folder](notes-folder.md#change-the-folder) drops them.

## See what agents did

The Agents pane shows the last five events, so you can see what each agent read and proposed. Margin keeps these in memory only, and forgets them when it quits.

## What agents cannot see

- A note kept out of AI, by \`.margin/ai.json\` or \`ai: false\`, never appears to an agent, in search results or by path. It answers as a missing note does.
- A passage between \`<!-- margin:protect -->\` marks comes back as \`(protected)\`, and search matches only text an agent may see.
- Margin refuses a path outside the notes folder, and a link that leads out of it.

See [AI in a note](ai.md#set-rules-for-a-folder) to keep notes out.

## Check agent instruction files

Agents such as Claude Code, Cursor and Copilot read instruction files from your project, and most pass over a setting they do not know without a word. Check Agent Files finds those mistakes.

1. Press ⇧⌘P and choose Check Agent Files.
2. Margin lists each instruction file in your notes folder with its problems, or No problems.
3. Choose a row and press Return to open the file, or show it in Finder.

Margin checks \`CLAUDE.md\`, \`CLAUDE.local.md\`, \`AGENTS.md\` and \`GEMINI.md\` in any folder, Claude Code's rules, skills and subagents under \`.claude/\`, Cursor rules under \`.cursor/rules/\`, and Copilot's instruction files under \`.github/\`. It flags misspelled or unknown front matter keys, values an agent does not accept, and files past the length an agent's docs advise, such as a \`CLAUDE.md\` over 200 lines or an \`AGENTS.md\` over 32 KiB. For a rule that applies to some files, the row says where, such as "Cursor rule · Applies to src/**/*.ts".

## See what an agent loads with a file

1. Open a \`CLAUDE.md\`, \`CLAUDE.local.md\`, \`AGENTS.md\` or \`GEMINI.md\`.
2. Press ⇧⌘P and choose Agent Context.

The list shows the files an agent loads with this one, under Loaded with it, and the files it imports with \`@path\`, as a tree under Imports. A row marks an import that is missing, outside the notes folder, already imported above, or past the number of hops the agent follows. The last line counts the files and lines the agent reads. Press Return to open a file.

## See also

- [AI in a note](ai.md), to keep notes and passages away from agents and AI
- [AI across notes](ai-across-notes.md), for the review where agent proposals wait
- [Troubleshooting](troubleshooting.md), when an agent cannot reach Margin
`,r=`---
title: AI across notes
section: AI
order: 2
summary: Ask questions about all your notes, change many notes at once, review drafts, and search by meaning.
---

# AI across notes

Some AI commands read more than the open note. They answer questions from your notes, apply one change to many notes, and check a draft against another note. As in a single note, nothing changes until you accept it, and notes you keep out of AI never take part. See [AI in a note](ai.md#set-rules-for-a-folder).

## Ask about your notes

1. Press ⌘J and choose Ask About Notes….
2. Type your question.
3. Margin [searches for its words](find-and-create.md#search-your-notes) and shows the best passage from each matching note. Remove any you do not want sent.
4. Send the question.

The answer cites each claim with a [link](links.md#link-to-another-note) to its passage, \`[[Note#Heading]]\`, and a short quote. A quote Margin cannot find in the note it names reads "Not found in note". On this Mac, the passages stay under 1,100 words in all, so one call can answer.

## Change several notes at once

1. Press ⌘J and choose Change Across Notes….
2. Describe the change, such as renaming a product.
3. Tick the notes to change.
4. Review the proposals. Every hunk appears in one list, grouped by note, with Accept and Reject for each hunk and each note.

Margin does not flag a detail you named in your request, so a rename needs no hand check of every hunk. When you apply the changes, Margin holds back any note that [changed meanwhile](safety.md#when-another-app-changes-a-note). To undo the whole set later, even after the review closes, press ⌘J and choose Undo Change Across Notes. A note changed since stays as it is.

## Review a draft

Press ⌘J and choose Review Draft. Margin reads the note and lists gaps, contradictions and terms the note never defines, above the editor. Each finding quotes the note. Margin keeps only findings whose quote it can find, and says how many it dropped. Choose a finding and press Return to select its quote. A finding goes away once you change the text it quotes.

## Check a draft against a checklist

1. Press ⌘J and choose Check Against….
2. Choose the note that holds the checklist or style rules.

Margin lists each item as Pass, Fail or Cannot tell. A pass must quote the draft, and a quote that is not in the draft turns the item into Cannot tell. Margin checks that the quoted words exist, not that they prove the verdict, so read the list with care.

## Keep dependent notes up to date

A note can say it depends on others in its [front matter](properties-and-bases.md#edit-a-notes-properties):

\`\`\`yaml
---
depends: [[Spec]]
---
\`\`\`

Use a list for several notes. In TOML front matter, write \`depends = ["[[Spec]]"]\`.

Press ⌘J and choose Notes Needing Review. Margin lists each note whose file is older than a note it depends on, and each note whose dependency is gone or kept out of AI. Choose a note to have AI propose an update, with the other note's text sent along and named on the Send line. Accept the update and the note's newer date clears its row.

## Search by meaning

Find by meaning searches for notes about an idea, even when they use other words. It runs on your Mac and works with AI off.

1. Press ⌘, and open the [AI settings](settings.md#ai).
2. Turn on Find by meaning. It is off at first.
3. In the search field, type \`?\` and then your words.

The list shows each note's closest passage. Delete the \`?\` to go back to ordinary search.

Margin reads each section of each note in the background, at low priority, and keeps what it learns in its [Application Support folder](privacy.md#where-margin-keeps-its-files). Notes kept out of AI are never read.

## Review proposals from coding agents

Edits from coding agents wait in the same review as Change Across Notes. See [Connect a coding agent](agents.md#review-what-an-agent-proposes).

## See also

- [AI in a note](ai.md), to turn on AI and run commands on one note
- [Check a note](checks.md), to check a note against Vale style rules, with no AI
- [Find and replace](find-and-replace.md), to replace exact text across notes, with no AI
`,i=`---
title: AI in a note
section: AI
order: 1
summary: Turn on AI on this Mac or with Claude, rewrite and reshape text as proposals you review, and see what leaves your Mac.
---

# AI in a note

AI is off until you turn it on. When it is on, AI commands rewrite, shorten, translate and reshape your text, but never change a note by themselves. Every reply arrives as a proposal under the text it would change, and you accept or reject each part.

## Turn on AI

1. Press ⌘, and open the [AI settings](settings.md#ai).
2. Choose one:
   - Off. No AI command shows and no AI code runs.
   - On this Mac. Margin uses Apple's on-device model. You need no account, and [nothing leaves your Mac](privacy.md#when-margin-goes-online).
   - Claude. Margin sends text to Anthropic's Claude with your own API key. Enter the key when you choose Claude.

Margin keeps your Claude key in the macOS Keychain and nowhere else.

The on-device model reads about 4,096 tokens at a time, reply included, so it works on passages. Margin splits a long section at its headings, then at its paragraphs. Claude reads whole notes.

## Run an AI command

1. Select text, or put the caret in a section.
2. Press ⌘J, click the AI button in the [format bar](formatting.md#use-the-format-bar), or choose the AI row in the slash menu.
3. Choose a command. If it needs a detail, such as a tone or a language, it asks first.

A command reads the selection if there is one, otherwise the caret's section, otherwise the whole note. A read-only note offers no AI commands.

| Command | What it does |
| --- | --- |
| Rewrite | Rewrites the text |
| Shorten | Makes it shorter |
| Expand | Makes it longer |
| Fix Grammar | Fixes the grammar |
| Change Tone… | Rewrites it in a tone you name |
| Change Reading Level… | Rewrites it for a reading level you name |
| Translate… | Translates it and keeps the formatting |
| Write Outline | Writes an outline below the text |
| Summarize | Writes a summary below the text |
| Notes to Draft | Turns rough notes into prose |
| Suggest Headings | Proposes headings for the text |
| Suggest Title | Proposes a title for the note |
| Prose to Table | Turns the text into a table |
| Prose to Checklist | Turns the text into a task list |
| Prose to Diagram | Writes a Mermaid diagram below the text |
| Pull Action Items | Lists a meeting's action items |
| Draft from Template… | Pours the text into a template |
| Explain | Explains the code block or equation at the caret |

For commands that work across several notes, such as Ask About Notes and Review Draft, see [AI across notes](ai-across-notes.md).

## Review a proposal

The reply streams into a proposal drawn under the text it would change. The note stays as it was until you accept.

- Accept or reject each part, called a hunk, or edit it first.
- Press ⌘↩ to accept every hunk.
- Press Esc to discard the proposal.

Accepting is one step of undo. If you stop a reply, what arrived so far stays as a proposal marked Stopped. If you edit the note over a hunk while the AI works, Margin keeps your edit, and that hunk can no longer be accepted.

## Watch for changed details

Margin checks each hunk, in code and not with the model, for changes to numbers, dates, web addresses, inline code, names, and the words must, shall and required. A hunk that changes one shows a glyph and a word such as "Number changed". Accept All skips it until you accept it on its own.

## Keep a passage away from AI

Wrap a passage in these two comments:

\`\`\`markdown
<!-- margin:protect -->
The contract value is $48,000.
<!-- /margin:protect -->
\`\`\`

The passage goes to the model as a placeholder and comes back unchanged. A run that would send only protected text sends nothing and says so. A protect mark with no end runs to the end of the note.

## Reshape text

- Write Outline and Summarize read the selection, or else the whole note, and put their reply a blank line below it.
- Notes to Draft and Suggest Headings replace what they read.
- Suggest Title reads the first 1,000 words and replaces the first heading, or adds one at the top.
- Prose to Table and Prose to Checklist replace what they read. Prose to Diagram puts a [Mermaid block](preview.md#draw-diagrams) below it.

Margin checks that a table, a checklist or a diagram reply has the right shape. A reply that does not says "Did not parse" and stays for you to read.

## Pull action items

Open a meeting note, press ⌘J and choose Pull Action Items. Margin reads the whole note and proposes a [task list](lists-and-tasks.md) under \`## Action items\` at its end, one task a line, with the owner and due date when the note names them, such as \`- [ ] Send the budget (Ada, Friday)\`. It leaves out what the note already has as a task. If there is nothing to pull, it says "The note holds no action items."

## Explain code or an equation

Put the caret in a [code block](code-blocks.md) or an equation, press ⌘J and choose Explain. The explanation appears in a popover. Click Insert to put it below the block.

## Draft from a template

1. Select your rough notes, or select nothing to use the whole note.
2. Press ⌘J and choose Draft from Template….
3. Choose a template from the list above the note.

The reply replaces what it read, as a proposal, in the template's shape. Margin flags any detail from your notes that the draft lost, and any number, date, link or requirement that is in neither your notes nor the template. See [Slash menu, snippets and templates](slash-menu.md#insert-a-template) for templates.

## See what a run will send

A run on this Mac says "Stays on this Mac".

With Claude, Margin asks before it sends more than a selection, or a selection over 1,000 words or of the whole note. One line shows the scope, the word count and an estimated cost, with Send and Cancel. Press ⌘↩ to send. After the run, the proposal shows the tokens used and the estimated cost, with the date of the price table it used.

Replies have no tools. A note that tells the model to ignore its instructions can only change a proposal, which you still review.

## Set rules for a folder

Put these files in your [notes folder's](notes-folder.md#files-margin-keeps-in-the-margin-folder) \`.margin\` folder:

- \`.margin/ai.md\` holds the audience, terms and style every run should follow. With Claude, the Send line names it and counts its words.
- \`.margin/ai.json\` lists folders and notes to keep out of AI, such as \`{"exclude": ["Private"]}\`.

To keep one note out, add \`ai: false\` to its front matter. A note kept out refuses an AI command with the reason, before anything is sent. If Margin cannot read \`.margin/ai.json\`, or it holds a field Margin does not know, AI pauses for the folder and says why.

## Save your own AI commands

1. In your notes folder, add a Markdown file to \`.margin/commands/\`.
2. Write a \`# Title\` line, then the prompt on the lines after it.

The command appears in ⌘J and the palette while AI is on, under its title. It rewrites what it reads, like Rewrite, and Margin reads the file fresh for each run. A file Margin cannot use shows as \`Name.md (broken)\` and says why when you run it.

## See which text came from AI

Press ⇧⌘P and choose Show Authorship. Margin records the AI text you accept in \`.margin/authorship/\`, with its source and date, and adds nothing to the note's file.

## Check the AI log

Margin logs each run in \`ai-log.jsonl\` in its Application Support folder: the time, the provider, the model, the scope, the tokens and the cost. The log never holds note text.

## See also

- [AI across notes](ai-across-notes.md), to ask questions of every note and change many at once
- [Privacy and network use](privacy.md), for exactly what Claude receives and what stays on your Mac
- [Connect a coding agent](agents.md), to let Claude Code or Codex read your notes and propose edits
- [Review SQL](schema-review.md), where AI can explain a finding and propose a fix
`,a=`---
title: Themes and writing comfort
section: Writing
order: 11
summary: Pick a theme, set type and spacing, use Focus Mode and typewriter scrolling, and write right-to-left text.
---

# Themes and writing comfort

Margin follows the system's light or dark appearance. You can change its colors with a theme, set the type and spacing, and dim everything but the paragraph you are writing.

## Choose a theme

1. Press ⌘, to open [Settings](settings.md#editor).
2. Under Editor, choose a Theme: Standard or Sepia.

Standard uses the system's own colors. Sepia sets the editor and the [preview](preview.md) on warm paper in light appearance and on warm dark brown in dark appearance. Both meet the WCAG 2.2 AA contrast ratio. Your highlight color still marks selected text.

A theme changes only the screen. [Exports, printing and Copy as HTML](export.md) stay black on white.

## Make your own theme

1. In your [notes folder](notes-folder.md#files-margin-keeps-in-the-margin-folder), put a CSS file in \`.margin/themes/\`, such as \`.margin/themes/Harbour.css\`.
2. Open Settings and choose Harbour under Theme. Your themes follow Standard and Sepia in the list.

Margin applies a theme as you save its file, so you can keep the file open in another editor and watch the change. A theme can set Margin's own color tokens, such as \`--surface\`, the color behind the editor and the preview, and anything else CSS can style.

- A theme file can be up to 1 MB.
- Margin passes over files whose names start with a dot, and files in folders inside \`.margin/themes/\`.
- A theme cannot load other style sheets with \`@import\` or use web fonts. It loads images from the web only while [Load remote images](images.md#show-images-from-the-web) is on.

## Set the font, size and spacing

Open Settings to change the editor's font, System, Monospaced or Serif, and these:

| Setting | Choices | At first |
| --- | --- | --- |
| Size | The text size in points | 15 |
| Line height | 1.2 to 2.0, in steps of 0.1 | 1.6 |
| Paragraph spacing | 0 to 1.5 text sizes, in steps of 0.25 | 0 |
| Maximum line width | Off, or 40 to 200 characters | Off, then 72 when you turn it on |
| Show line numbers | On or off | Off |

Paragraph spacing adds room between blocks and leaves the lines inside a paragraph, list, table or code block at their usual pitch. The preview uses the same spacing, a little tighter. Exports and print keep their own spacing.

Press ⌘+, ⌘- or ⌘0 to change the text size without opening Settings. See [Write and edit](editor.md#change-the-text-size).

## Focus on one paragraph

Press ⌘D to turn on Focus Mode. Margin dims every line outside the block the caret is in to 40 percent, and hides the footer, the note list and the [folder column](manage-notes.md#show-the-folder-column). The lit block is the caret's paragraph, heading, code block, table or list item. Select text across blocks to light all of them.

Press ⌘\\ to bring the list back while you work. Press ⌘D again to leave Focus Mode. The list returns if it was showing when you started.

## Keep the caret in the middle

Press ⌥⌘T to turn on typewriter scrolling. As you type, delete, undo or use the arrow keys, Margin scrolls so the caret's line stays in the middle of the editor. A click or a drag scrolls nothing, so the text holds still under the pointer.

Focus Mode and typewriter scrolling each have a switch in Settings. Margin remembers both the next time it opens.

## Use Increase Contrast

Turn on Increase Contrast in System Settings, under Accessibility and then Display. Margin darkens its quiet colors so dimmed marks, bullets, checkbox edges, keycaps, [calculation answers](calc.md) and thin lines reach a contrast ratio of 4.5 to 1. A theme keeps the colors it sets.

## Write text that runs right to left

Margin runs each line in the direction of its first letter. A Hebrew or Arabic line runs right to left beside an English one, and the arrow keys move by where the letters sit. A right-to-left heading puts its marks in the right margin, and a right-to-left quote draws its bar on the right.

The preview, exports, print, Copy as HTML and slides do the same for each heading, paragraph, list, quote and table. A list or table takes the direction of its first letter, and its items and cells follow it. Code, rules, pictures and blocks with no letters keep the page's direction.

## Set a text direction

To set one direction for every line:

1. Open Settings.
2. Under Editor, choose Text direction: Automatic, Left to right or Right to left.

To set it for one note, add a \`dir\` property to its front matter with \`auto\`, \`ltr\` or \`rtl\`:

\`\`\`yaml
---
dir: rtl
---
\`\`\`

With a fixed direction, every line takes it, so a line that starts with a number or a Latin name in a right-to-left note stays right to left. Automatic reads each line on its own, as described above.

## See also

- [Write and edit](editor.md), for text size, spell check and input methods
- [Export, print and share](export.md), to set the look of PDFs and HTML with an export template
- [Open and close the panel](panel.md), to fill the screen with the panel
`,o="---\ntitle: Math in notes\nsection: Math in notes\norder: 1\nsummary: Work out sums, percentages, units, dates and currencies in a note, with each answer beside its line.\n---\n\n# Math in notes\n\nWrite arithmetic in plain words and Margin shows the answer at the right of each line, the way Numi and Soulver do. Answers never go into the file, so the note stays plain Markdown.\n\n## Start a calculation\n\nMargin works out lines only inside a calculation, so a list item such as `1. Buy milk` or a date such as `2026-11-03` elsewhere in your notes stays as it is. Start one in either of these ways:\n\n- Add a ` ```calc ` block. Type `/` and choose [Calc block](slash-menu.md#insert-a-block-from-the-slash-menu), or type the fence yourself. Margin works out every line in the block.\n- Add `calc: true` to a note's [front matter](properties-and-bases.md#write-front-matter). Margin works out every line from the end of the front matter to the end of the note, except tables, HTML and other code blocks. In Margin 0.1.6 and later, Turn On Math for This Note in the palette (⇧⌘P) writes it for you, and Turn Off Math for This Note takes it out.\n\nA ` ```math ` block is still [LaTeX math](preview.md#write-math), not a calculation.\n\n## Write lines Margin can read\n\nMargin finds the arithmetic in each line and passes over the words around it.\n\n| Line | Answer |\n| --- | --- |\n| `$19 for breakfast + $22 for the uber` | $41.00 |\n| `Rent: 1,850` | 1,850 |\n| `- [ ] Rent 1,850` | 1,850 |\n| `6 (3)` | 18 |\n\n- Text before a colon and a space is a label.\n- Everything after `//` is a comment.\n- Margin skips text in double quotes.\n- List markers, task boxes, quote marks, emphasis and link addresses come off first.\n- A heading shows no answer, even when it holds numbers.\n- A line with nothing Margin can read shows no answer and no error.\n\n## Do arithmetic\n\nUse symbols or words. `and` and `with` add, `without` subtracts, and `mul` and `times` multiply. `6 (3)` multiplies too.\n\n- `2 ^ 3 ^ 2` is 512, since powers group from the right.\n- `square root of 50000`, `sqrt 50000`, `sqrt(50000)` and `50000^0.5` are all 223.60679775, and `cube root of 27`, `cbrt 27` and `root 3 of 27` are 3. From Margin 0.1.6 the signs work too, `√50000` and `∛27`.\n- `sqrt`, logarithms and trigonometry work in radians unless a value says `°` or `degrees`.\n- `larger of 100 and 200` is 200.\n- `random number between 1 and 10` draws a new whole number each time Margin reads the line.\n- `0.1 + 0.2` is 0.3, since Margin counts in decimal.\n\nAnswers show up to 10 decimal places. A line Margin cannot work out, such as `1 / 0`, shows no answer.\n\n## Work with percentages\n\n| Line | Answer |\n| --- | --- |\n| `200 + 10%` | 220 |\n| `10% of 200` | 20 |\n| `10% off 200` | 180 |\n| `30% + 0.4` | 70% |\n| `20/200 %` | 10% |\n| `20 is 10% of what` | 200 |\n| `50 to 75 is what %` | 50% |\n| `5% of what is $6` | $120.00 |\n| `2/3 of 600` | 400 |\n| `1/4 off $100` | $75.00 |\n| `2/10 as fraction` | 1/5 |\n| `0.534 to nearest 16th` | 9/16 |\n| `20/5 as multiplier` | 4x |\n\n`as %` makes a number a percent, and `as dec` makes a percent a number again.\n\n## Use variables and earlier lines\n\n- `name = value` sets a variable. A name can be several words, and works on the lines below it.\n- `+=` and `-=` change a variable.\n- `prev` is the answer on the line above. A line that starts with an operator, such as `* 2`, carries on from it.\n- A `---` line clears your variables.\n\nVariables carry on through every calculation in a note, top to bottom. Type two letters of a variable's name to have Margin offer it.\n\n## Add up totals\n\nWrite `sum` or `total` to add the answers above it, `average` or `avg` to average them, or `subtotal` to add them as a subtotal. Each stops at the nearest blank line, heading, `---` line or earlier total.\n\nWhile the caret is in a calculation, the [footer](window-tour.md#the-footer) shows its Total. Select lines to total only those, under Selection. Click the footer total to copy it. Answers that do not add, such as 5 km and 3 kg, show no total.\n\n## Convert units\n\nUse `in`, `into`, `as` or `to` to convert.\n\n| Line | Answer |\n| --- | --- |\n| `1km + 1,000m` | 2 km |\n| `1 meter 20 cm` | 120 cm |\n| `5 km in 25 min` | 05:00/km |\n| `time to upload 3GB at 10 MB/s` | The time, in the largest whole unit |\n| `12h 30m in degrees` | An angle, at 15° an hour |\n\n- Data sizes count 1,000 for `kB` and 1,024 for `KiB`, with `b` for bits and `B` for bytes.\n- Temperatures read `°C`, `C`, `celsius`, the same for Fahrenheit, and `K` or `kelvin`.\n- `em` is 16 px and `ppi` is 96 until a line sets them. `at 326 ppi` sets the density for its own line.\n- `cast` changes a unit without converting.\n- A fraction before a unit is that much of the unit, as in a recipe. `1 1/2 pounds` is 1.5 lb, and from Margin 0.1.6 `1/3 cup` is 0.33 cup and `1 1/3 cups in ml` is 315.45 ml. After a currency it stays a price, so `$10/2 kg` is $5.00/kg.\n\nWhen two amounts of one kind add, the larger unit wins. A plain number takes the other amount's unit.\n\n## Work with dates and times\n\n| Line | Answer |\n| --- | --- |\n| `today + 3 weeks` | The date three weeks from today |\n| `days between 3 March and 30 May` | The days between them |\n| `January 31 2020 + 1 month` | 29 February 2020 |\n| `6pm Sydney in Chicago` | The time in Chicago |\n| `time in Tokyo` | Tokyo's time now |\n\n- A date without a year is this year's, unless that is more than nine months ago.\n- A date in digits needs a four-digit year, and reads in your region's order.\n- A clock time needs am or pm. A city counts as a time zone only beside a time, so `flight to Paris $500` is $500.00.\n- One date minus another gives the span between them in years, months, weeks and days.\n\n## Use rates\n\nA rate is an amount per unit, such as `3 hours / day`, `$99 per week` or `$24 a day`.\n\n| Line | Answer |\n| --- | --- |\n| `$50/week × 12 weeks` | $600.00 |\n| `$24 a day for a year` | $8,765.82 |\n| `30 hours at $30/hour` | $900.00 |\n| `$500 at $20/hour` | 25 hours |\n\nWrite `as / month`, `in €/month` or `is what per year` to restate a rate. In time arithmetic a year is 365.2425 days and a month is a twelfth of one.\n\n## Convert currencies\n\nWrite money with a sign such as `$`, `€`, `US$` or `C$`, a code after the amount such as `50 CHF`, a common code before it such as `EUR 50`, or a name such as `dollars` or `yen`.\n\nMargin finds a rate for a conversion in this order:\n\n1. A rate on the line itself, such as `50 EUR in USD at 1.05 USD/EUR`.\n2. A rate line above it in the note or the definitions note, such as `EUR = 1.09 USD`.\n3. A currency both have a rate to.\n4. The European Central Bank's reference rates for about 30 currencies, bundled with Margin on the day it was built.\n\nPoint at an answer converted with the bundled rates to see their date. A sum of two currencies converts into the first. Without a rate, the line reads, for example, \"no EUR rate\". Margin [never fetches rates](privacy.md#when-margin-goes-online) from the internet.\n\n## Format numbers\n\nMargin uses your Mac's region for decimal points, thousands separators and clock times, and reads your lines the same way. `1_000_000`, `1e3` and `5 300` all read as numbers.\n\nAdd a format to any line, such as `in hex`, `in binary`, `as base 8`, `in sci`, `to 2 dp`, `to 5 digits`, `to nearest 10`, `rounded down` or `rounded up to nearest 5`. Large answers show as `1.7M`. Money rounds to its currency's places, so yen show none.\n\nTo set defaults, open [Settings](settings.md#math) and find Math. Turn large answers as 1.5M on or off, and choose decimal places from 0 to 10 or automatic.\n\n## Copy answers\n\n- Click an answer to copy it. It reads Copied for a second.\n- Press ⌥⇧⌘C to copy the answer on the caret's line, as shown.\n- Choose Copy Unformatted Answer in the palette to copy the number without separators, units or notation.\n- Choose Copy with Answers to copy the selected lines, or the whole calculation, as `expression | answer` lines lined up on the bar.\n- Choose Insert Answer to add the answer to the caret's line as a comment, such as ` // 1,850`. The `//` keeps it out of later sums.\n\nA long answer ends in an ellipsis. Point at it to see all of it.\n\n## Define your own units and values\n\nPick one note to hold the values and units you use everywhere:\n\n1. Open Settings and find Math.\n2. Choose a definitions note.\n\nIts variables, units and rates apply in every calculation in that notes folder, below each note's own. A unit is written in terms of one Margin knows, such as `1 watermelon = 20 lb`, and its plural works too, so `40 lb in watermelons` is 2 watermelons. If you [rename](manage-notes.md#rename-a-note) the definitions note in Margin, the choice follows it.\n\n## See answers in the preview and exports\n\nThe preview shows a ` ```calc ` block with its answers in a second column, and each answer of a `calc: true` note at the right of its line. [Printing, HTML and PDF exports](export.md), Copy as HTML and Share carry the answers. Export as plain text writes `expression | answer` lines.\n\n## What Margin leaves out\n\nMargin does not do math that needs the internet, such as weather, stocks or live crypto rates. It has no numbered line references, since a plain file has nowhere to keep them when lines move, and no scripting. For custom units and values, use the definitions note.\n\n## See also\n\n- [Read the preview](preview.md), for LaTeX math, which draws formulas and works nothing out\n- [Export, print and share](export.md), to print or export a note with its answers\n- [Settings](settings.md), for the Math settings and the definitions note\n",s=`---
title: Check a note
section: Writing
order: 12
summary: Check a note's accessibility, style rules and front matter before you publish or share it.
---

# Check a note

Margin has commands that check the open note against a set of rules and list what they find above the editor. Each list works like the [outline](outline-and-sections.md#open-the-outline). Type to filter it, use the arrow keys to choose a row, press Return to go to the problem, and press Esc to close the list. Nothing is checked until you run a command.

## Check accessibility

1. Press ⇧⌘P and choose Check Accessibility.
2. The list shows two kinds of problem:
   - An Error for each image with no [alt text](images.md#add-alt-text-and-a-caption), with its line and path.
   - A Warning for each heading that skips a level, such as a level 4 heading under a level 2.
3. Choose a row and press Return. For an image, Margin opens the Alt text and caption sheet. For a heading, it puts the caret at the heading's start.

The list also names the language the [HTML export](export.md#export-a-note) will declare, from the note's \`lang\` property or else your Mac's language. A note with neither problem says "No accessibility problems." and the language.

The HTML export writes that language into the page, and writes a [numbered table's caption](preview.md#number-figures-equations-and-tables) as the table's own caption.

## Check style with Vale rules

If your project uses Vale for terms and style, Margin can run its rules on a note.

1. Press ⇧⌘P and choose Check Style.
2. Margin finds the nearest \`.vale.ini\`, \`_vale.ini\` or \`vale.ini\` in the note's folder or a folder above it, and the styles it names.
3. The list shows each alert with its level, its rule, the text it matched and its message. Press Return to select the match.

While the list is open, a dotted line marks each match in the editor, with the message as its tooltip. Fix a match and its row goes away.

Margin runs Vale's existence and substitution rules, and its Vale.Terms and Vale.Avoid rules with your vocabulary. It names any other rule types it did not run. It leaves out front matter, code, math, HTML, comments and link addresses.

If no \`.vale.ini\` applies, or the note raises no alerts, the list says so. Margin reads up to 2,000 style files and 8 MB, and passes over hidden files and files over 1 MB.

## Check front matter against a schema

You can describe the [properties](properties-and-bases.md#edit-a-notes-properties) a note should have in a JSON Schema, and check the note against it.

1. Name the schema in one of two ways:
   - In the note's front matter, as \`$schema: schemas/post.yaml\`.
   - In \`.margin/frontmatter.json\`, by which notes it applies to:

     \`\`\`json
     {"version": 1, "schemas": [{"files": "Blog/**", "schema": "schemas/post.yaml"}]}
     \`\`\`

2. Press ⇧⌘P and choose Check Front Matter.
3. The list shows each problem by its key, such as \`tags[1]\` or \`author.name\`, and what is wrong, such as Missing, Must be a string, or Not in the schema. Press Return to go to the key.

A path is read from the notes folder, or from the note's folder when it starts with \`./\` or \`../\`. Margin refuses a path that leads out of the notes folder. The schema can be YAML or JSON.

Margin checks these keywords: \`type\`, \`enum\`, \`const\`, \`required\`, \`properties\`, \`additionalProperties\`, \`items\`, \`minItems\`, \`maxItems\`, \`minLength\`, \`maxLength\`, \`pattern\`, \`minimum\`, \`maximum\`, \`allOf\`, and \`$ref\` to the schema's own definitions. The list's last line names any keyword it did not check, such as \`format\`. A note that passes says "The front matter follows schemas/post.yaml."

## Other checks

- To list a note's hard line breaks, see [Write and edit](editor.md#see-where-lines-break).
- To find links that lead nowhere, see [Links and wikilinks](links.md#fix-broken-links).
- To review the SQL in a note, see [Review SQL](schema-review.md).
- To check the instruction files for coding agents, see [Connect a coding agent](agents.md#check-agent-instruction-files).

## See also

- [Images and attachments](images.md), to add alt text and captions
- [Export, print and share](export.md), to export the checked note as HTML or PDF
- [Tags, properties and bases](properties-and-bases.md), to edit the front matter a schema checks
`,c=`---
title: Code blocks
section: Writing
order: 7
summary: Write fenced code with highlighting, set its language, copy it from the preview, and indent it by .editorconfig.
---

# Code blocks

A fenced code block starts and ends with a line of backticks. Margin highlights the code inside by its language, in the editor and the [preview](preview.md), using grey tones: keywords in bold, strings and punctuation lighter, comments in italic.

## Add a code block

Do one of these:

- Select lines and press ⇧⌘K. Margin puts fences around them. Its fence is one backtick longer than any run of backticks inside, so code that holds backticks stays whole.
- Type \`/\` at the start of a line and choose Code block in the [slash menu](slash-menu.md#insert-a-block-from-the-slash-menu).
- Type three backticks and a language name, such as \` \`\`\`python \`, on a line of its own.

To take the fences off a block, put the caret inside it and press ⇧⌘K.

## Set a block's language

1. Put the caret in the block, or on either of its fence lines.
2. Press ⇧⌘P and choose Set Code Language….
3. Type to narrow the list of languages, each shown by the name a fence uses with its full name below it.
4. Press Return.

Margin writes the name on the opening fence and keeps anything after it, such as a title. If the caret is not in a block, Margin says "Put the caret in a fenced code block to set its language."

## Expand HTML and CSS abbreviations

In Margin 0.1.6 and later, Tab expands an Emmet abbreviation, the shorthand many code editors take, in a block whose language is html, htm, xml, svg or vue, or css, scss, less or sass.

1. Type the abbreviation inside the block, such as \`ul>li*3\`.
2. Press Tab. Margin puts the HTML or CSS in its place, with the caret in the first empty spot.
3. Type there, then press Tab to go to the next empty spot. After the last one, Tab types a tab again. Esc stops sooner.

One ⌘Z brings the abbreviation back as you typed it. Tab with no abbreviation before the caret types a tab, as before, and Tab in prose, a sql block or a calc block never expands one. In a jsx or tsx block, start the abbreviation with \`<\`, as in \`<div.card\`, so Tab after a word of JavaScript still types a tab.

| You type | Tab gives |
| --- | --- |
| \`ul>li*3\` | A \`ul\` holding three empty \`li\` items, one to a line |
| \`div.card>h2+p\` | \`<div class="card">\` holding an \`h2\` and a \`p\` |
| \`a[href=#]\` | \`<a href="#"></a>\`, with the caret inside the link |
| \`m10\` | \`margin: 10px;\` |
| \`p10-20\` | \`padding: 10px 20px;\` |
| \`df\` | \`display: flex;\` |

To see every form with what Tab gives, press ⇧⌘P and choose HTML and CSS Abbreviations Cheat Sheet.

## Copy code from the preview

In the preview, each code block has a row above it with its language and a Copy button. Click Copy to put the block's text on the clipboard, as written. The button reads Copied for a moment. [Exports and print](export.md) leave this row out.

## Indent code by .editorconfig

If your project has \`.editorconfig\` files, Margin can indent code blocks the way they say.

1. Put the caret in a code block, or outside every block to format them all.
2. Press ⇧⌘P and choose Format Code Blocks.

Margin reads each \`.editorconfig\` from the note's folder upward, and stops at one that says \`root = true\`. It matches sections against a file named for the block's language, such as \`block.py\` for a \`python\` block. Then it applies these settings:

| Setting | What Margin does |
| --- | --- |
| \`indent_style\`, \`indent_size\`, \`tab_width\` | Rewrites each line's indent as tabs or spaces |
| \`trim_trailing_whitespace\` | Removes spaces and tabs at the ends of lines |

The notice says "Formatted the code block by .editorconfig.", or that no \`.editorconfig\` applies. One ⌘Z undoes it. Format Code Blocks changes only indents and line ends, not the code itself.

## Paste code from a chat or a developer tool

Code you copy from a chat app or a developer tool [pastes](formatting.md#paste-formatted-text) as one fenced block. Margin keeps its language label as the fence's language and leaves out the text of copy buttons.

## Explain a block with AI

With AI on, Explain describes the code block at the caret. See [AI in a note](ai.md#explain-code-or-an-equation).

## Run SQL

A \` \`\`\`sql \` block can hold a database schema or queries you run against a database. See [SQL schema blocks](schema-blocks.md) and [Database connections](databases.md).

## See also

- [SQL schema blocks](schema-blocks.md), for what Margin reads and checks in a sql block
- [Math in notes](calc.md), for calc blocks, which show an answer beside each line
- [Plugins, macros and hooks](plugins.md), to draw a fenced block of your own language
`,l=`---
title: Database connections
section: SQL and databases
order: 3
summary: Connect PostgreSQL, MySQL and SQLite databases, run a note's SQL safely, and import or compare schemas.
---

# Database connections

Margin can run the [SQL in a note](schema-blocks.md) against a database you set up. Connections are read-only until you allow writes, the database itself enforces that, and nothing runs until you ask. A statement never runs when a note opens, from the preview, or from an [AI reply](ai.md#review-a-proposal).

## Add a connection

1. Press ⌘, and choose [**Databases**](settings.md#databases).
2. Click **Add Connection…**.
3. Fill in the sheet:

| Field | What to put in it |
| --- | --- |
| Name | The name your notes use, such as \`staging\`. A note names this, never the server. |
| Engine | PostgreSQL, MySQL or SQLite. |
| File | SQLite only. The database file, typed or picked with **Choose…**. |
| Host | The server's address, such as \`db.example.com\`, or \`localhost\`. |
| Port | Leave it empty for the engine's usual port, which shows in grey. |
| Database | The database's name on the server. |
| User | The user Margin signs in as. A read-only role is safest. |
| Password | Kept in your Mac's Keychain, never in a file. Editing a connection shows Saved. |
| Environment | Development, Test or Production. It decides how a write is confirmed. |
| Allow writes | Off for every new connection. See [Allow writes](#allow-writes). |

4. Click **Test**. Margin connects, says what it found, or says why it could not connect.
5. Click **Save**.

You can edit or remove a connection from the same pane. Margin asks before it removes one, since its password goes with it.

Margin keeps the list of connections in its [Application Support folder](privacy.md#where-margin-keeps-its-files), without passwords. Each password lives in the macOS Keychain.

## Name a connection in a note

Add \`connection:\` to the note's [front matter](properties-and-bases.md#edit-a-notes-properties):

\`\`\`yaml
---
connection: staging
---
\`\`\`

The name works only with connections set up on this Mac, so a note you share carries no server details. If no connection has that name, Margin says "No connection named staging on this Mac."

## Run a query

Put the caret in a \` \`\`\`sql \` block and press ⇧⌘↩, or click Run in the block.

Results appear under the block and never go into the file. Margin shows at most 1,000 rows and stops a query after 30 seconds. Press Esc to cancel a query that is running.

You can take the results with you:

- Insert as Table puts the rows in the note as a [Markdown table](tables.md), in one step of undo.
- Copy as CSV copies them. Margin puts an apostrophe before a value a spreadsheet would run as a formula.

## Connections start read only

A new connection is read-only, and the database itself enforces it. On a read-only connection Margin also refuses statements that could write outside a table, such as PostgreSQL's \`COPY\` to a file and \`DO\` blocks, and MySQL's \`INTO OUTFILE\` and stored procedure calls.

A read-only database role with no rights to the server's files is the only full lock. Margin's holds stop writes through its own session.

## Allow writes

Each connection has an environment and a switch for writes.

| Environment | Writes at first | Before a write runs |
| --- | --- | --- |
| Development | Off | A sheet names the target, the operation and its effects |
| Test | Off | The same sheet, every time |
| Production | Off, and the switch warns you | The same sheet, and you type the connection's name |

With writes on, Margin shows the sheet before any statement it judges to be a write, or cannot name. A run you did not confirm in the sheet opens the connection read-only anyway. A confirmed write runs one statement at a time, and Margin rolls back a transaction left open.

## Connect securely

Margin requires an encrypted connection to PostgreSQL and MySQL unless the host is \`localhost\`, an address in \`127.0.0.0/8\`, or \`::1\`. It checks the server's certificate against your Mac's trust settings, and refuses a server that turns encryption off. PostgreSQL signs in with SCRAM-SHA-256 only. Margin refuses a sign-in method that would send your password unprotected, and says why.

## Import a schema from a database

Put the caret where the schema should go, press ⇧⌘P and choose Import Schema. Margin reads the connection's tables, constraints and indexes, read-only, and proposes them as one \` \`\`\`sql \` block below the caret. Only Accept changes the note.

Margin cannot check MySQL schemas yet, so an imported MySQL block stays unchecked and says so.

## Compare a note with the database

Press ⇧⌘P and choose Compare with Database. Margin reads the connection's schema and lists, above the note, each table, column and index the note declares that the server lacks, and each column whose type differs. A table only the server has is listed apart, since a note may hold part of a schema. Choose a row to select that text in the note. Compare with Database does not work with MySQL connections yet.

## Read table sizes and plans

For Read Table Sizes, Run Plan and Run Plan with ANALYZE, see [Review SQL](schema-review.md#read-sizes-and-plans-from-a-database).

## See also

- [SQL schema blocks](schema-blocks.md), to write the schema a connection is compared with
- [Review SQL](schema-review.md), to read table sizes and live plans into Review
- [Privacy and network use](privacy.md), for every connection Margin makes
`,u=`---
title: Edit Without Marks
section: Writing
order: 10
summary: Keep Markdown marks hidden on the line you are typing, edit tables as a grid, and change blocks from a menu.
---

# Edit Without Marks

Margin normally [hides Markdown marks](editor.md#hide-markdown-marks) on every line except the caret's. Edit Without Marks hides them on the caret's line too, so you write formatted text without seeing asterisks or pound signs. The file still holds every mark, and any Markdown app reads it as before.

## Turn on Edit Without Marks

Edit Without Marks works on top of hidden marks. If Hide Markdown Syntax is off, press ⇧⌘M first.

- Press ⇧⌘P and choose Edit Without Marks.
- Or open [Settings](settings.md#editor) and turn on "Hide it on the caret's line too".

It is off at first. While hidden marks are off, the command is dimmed and the switch is grey.

## Move the caret over hidden marks

Each hidden mark counts as one step for the arrow keys, so you never have to press an arrow key through a run of asterisks.

- From the line above a heading, list item, task or quote, one press of ↓ lands on its text. Home goes to the start of the text, never before the marks.
- Delete at the start of the text removes the leading marks and turns the block into a plain line.
- Elsewhere, Delete and Forward Delete remove the visible character next to a hidden mark and leave the mark alone.
- At the end of bold or linked text, what you type goes inside it. Press → once more to step out.

The lines that hold find matches show their marks while the [find bar](find-and-replace.md#find-text-in-a-note) is open.

## Edit a table as a grid

With Edit Without Marks on, a table draws as a grid of cells with thin lines between them and a heavier header row. The caret goes only into cells.

- Press → at the end of a cell to go to the start of the next.
- Tab, ⇧Tab, Return and the table commands work as usual, so Tab past the last cell adds a row.
- A \`|\` you type goes into the cell as text.
- Delete at the start of a cell, and Forward Delete at its end, do nothing, so two cells never merge.
- Press ↑ from the header row or ↓ from the last row to leave the table.

See [Tables](tables.md) for the table commands.

## Work with an image line

A line that holds only an image shows the image and no Markdown, even with the caret on it. The whole line is one place for the caret, and the image under the caret sits on a light neutral fill.

- Press Delete or Forward Delete to remove the image's line, in one step of undo.
- Press Return to start a line under it.
- Double-click the image to edit its alt text and caption. See [Images and attachments](images.md#add-alt-text-and-a-caption).

## Change a block from the format bar

With Edit Without Marks on, the [format bar](formatting.md#use-the-format-bar) also appears when you select text with the keys, such as Shift and an arrow, or with Expand selection. It does not appear for Select All.

At the bar's left, a block menu names the block the caret is in: Text, Heading 1, Heading 2, Heading 3, Bullet list, Numbered list, Task, Quote or Code block. Choose another kind to change every block the selection touches, in one step of undo. A numbered list counts from 1.

With Edit Without Marks off, the format bar appears only after you select with the pointer.

## See also

- [Write and edit](editor.md), for hidden marks and the key that shows them
- [Tables](tables.md), for every table key and command
- [Themes and writing comfort](appearance.md), for Focus Mode, typewriter scrolling and line spacing
`,d=`---
title: Write and edit
section: Writing
order: 1
summary: Type, select and move text in Margin's Markdown editor, and keep track of words and headings as you go.
---

# Write and edit

Margin's editor is a Markdown editor that behaves like a Mac text view. ⌘A, ⌘C, ⌘X, ⌘V, ⌘Z and ⇧⌘Z work as usual, and so do Option-arrow word moves, ⌃A and ⌃E, spell check, dictation, the emoji picker, Writing Tools and input methods for Chinese, Japanese and Korean. Margin highlights the Markdown as you type, in the note's [flavor](flavors.md).

## Hide Markdown marks

Margin hides Markdown marks on every line except the one with the caret. Bold text shows bold without its asterisks, a heading shows without its \`#\` marks, and a link shows only its text, underlined. Move the caret onto a line and its marks come back, so you can edit them.

With marks hidden:

- A bullet \`-\`, \`*\` or \`+\` draws as •.
- A task's \`[ ]\` or \`[x]\` draws as a checkbox you can click.
- A quote's \`>\` draws as a bar at the left of the line.
- A \`---\` line draws as a rule across the text.
- A [wikilink](links.md#link-to-another-note) shows its alias or its title, without the brackets.

[Code fences](code-blocks.md), front matter, [tables](tables.md), math, HTML and footnote marks always show.

To show every mark, dimmed, press ⇧⌘M, or turn off Hide Markdown syntax in [Settings](settings.md#editor). Press ⇧⌘M again to hide them. Hiding marks never changes the file, so saving, undo, find, copy and every [export](export.md) see the same Markdown.

When you click at the very end of a link, a code span or bold text, the caret lands outside its hidden marks, so what you type next is not part of it.

To keep marks hidden even on the caret's line, see [Edit Without Marks](edit-without-marks.md).

## Undo and redo

Press ⌘Z to undo and ⇧⌘Z to redo. Each note keeps its own undo history while Margin runs, so you can switch to another note, come back, and still undo. Margin keeps history for the 20 notes you opened most recently, up to 4 million characters in all.

## Select more or less

Press ⌃⇧⌘→ to expand the selection to the next larger piece that holds it: the word, then its sentence, then the syntax around it such as bold text, a list item, its list, or a table's cell, row and table, then the section under its heading, the sections above that, and the whole note. Press ⌃⇧⌘← to shrink it back, step by step, to where you started.

## Type in several places at once

⌘-click in the text to add another caret. What you type goes in at every caret. ⌘-click on a link still opens the link.

## Move a block

Press ⌃⇧⌘↑ or ⌃⇧⌘↓ to move the block at the caret past the block above or below it. A block is a paragraph, a code block, a table, a quote or a whole list. Inside a list, the block is the item and whatever is nested under it, and it stays in its list. On a heading, the block is the heading's whole [section](outline-and-sections.md#move-a-section).

The blank lines between blocks stay where they were, numbered lists keep their numbers in order, and each move is one step of undo.

## Drag a block

When you point at a block, a handle of six dots appears at its left.

1. Drag the handle. A line shows where the block will land.
2. Let go. The block moves there, and the caret goes with it.

Press Esc during the drag to cancel. The drag does not scroll the note, so use ⌃⇧⌘↑ and ⌃⇧⌘↓ to move a block farther.

To move a block without dragging, click the handle without moving the pointer. A menu offers Move Up and Move Down.

## Indent several lines

Select lines that span a line break and press Tab to indent each one by a tab, or ⇧Tab to take one level of indent off each. Lines with no text stay as they are. In a list, Tab and ⇧Tab move list items instead. See [Lists and tasks](lists-and-tasks.md#nest-and-unnest-items).

Outside a list, Tab at the caret types a tab and ⇧Tab does nothing, so neither key moves you out of the editor.

## Tidy a note

Press ⇧⌘P and choose Format document. It removes:

- Spaces and tabs at the ends of lines.
- More than one blank line in a row.
- Blank lines before the first line, and extra newlines at the end.

It adds a final newline if the note has none. A line break made with two spaces keeps exactly two. Code, math, HTML, comments, front matter, tables and list numbers stay as written. One ⌘Z undoes the whole tidy.

Margin never runs Format document on its own. Opening, switching modes and saving leave a note exactly as you wrote it.

## See where lines break

A line that ends in a hard line break shows ↵ after its text. Point at the mark to see what makes the break, such as two spaces, and what happens without it.

To list every break in the note, press ⇧⌘P and choose Line breaks. The list shows three groups: hard breaks, lines the [preview](preview.md) joins into one paragraph, and lines that end in spaces that make no break. Choose a row to go to it. The last line says what one Return does in the note's flavor. Choose Line breaks again to close the list.

## Count words

The [footer](window-tour.md#the-footer) shows the note's word count, character count and reading time. Select text to count only the selection, under a Selection label. The counts update when you pause typing.

## Follow the heading path

The left end of the footer shows the headings the caret sits under, outermost first, joined by ›. Click a heading to go to it. The path is empty above the first heading and in preview mode.

## Change the text size

| Keys | What they do |
| --- | --- |
| ⌘+ or ⌘= | Make text one point bigger |
| ⌘- | Make text one point smaller |
| ⌘0 | Reset text to 15 points |

The size runs from 10 to 32 points, applies to the editor and the preview, and stays the same next time you open Margin.

## Type in any language

Margin works with the macOS input methods for Chinese, Japanese and Korean, with the emoji picker, with dictation and with Writing Tools. Emoji and letters written with combining marks save exactly as you typed them, with the same Unicode form. For Hebrew, Arabic and other right-to-left scripts, see [Themes and writing comfort](appearance.md#write-text-that-runs-right-to-left).

## Check spelling

Margin checks spelling as you type. To turn it off, open Settings and turn off Spell check.

## Type emoji by name

Type \`:\` and two letters in ordinary text to see a list of emoji whose names match, such as \`:ta\` for \`:tada:\`. Each row shows the emoji and its name. Press Return or Tab to put one in. In the GitHub and All flavors Margin writes the shortcode, which those flavors draw as an emoji. In the others it writes the emoji itself. Press Esc to close the list and keep what you typed.

The list does not open after a digit, inside a word, or in code, front matter or math, so \`10:30\` stays as typed.

## Start in an empty note

An empty note shows "Start writing, or type / to insert a block". Type \`/\` at the start of a line to open the [slash menu](slash-menu.md).

## See also

- [Format text](formatting.md), for the formatting keys, the format bar and paste
- [Find and replace](find-and-replace.md), to find and replace text in a note
- [Keyboard shortcuts](keyboard-shortcuts.md), for every editing key, and how to change one
`,f=`---
title: Export, print and share
section: Reading and sharing
order: 3
summary: Export notes as HTML, PDF, Markdown or plain text, add headers and covers to PDFs, print, and share.
---

# Export, print and share

Margin exports what the preview shows, with math, highlighted code, diagrams and [calculation answers](calc.md#see-answers-in-the-preview-and-exports). Exports and printed pages are always black on white, whatever [theme](appearance.md#choose-a-theme) or appearance you use on screen.

## Export a note

1. Click ⋯ in the [editor header](window-tour.md#the-editor-header) and choose Export…, or choose Export… in the command palette.
2. In the save panel, choose a format: HTML, PDF, plain text or Markdown.
3. Choose where to save it and click Save.

| Format | What you get |
| --- | --- |
| HTML | One self-contained page, with images, math, highlighted code and diagrams inside it |
| PDF | Letter pages with 36-point margins, breaking between blocks |
| Plain text | The note's words without Markdown marks |
| Markdown | A folder named for the note, with the note as \`Title.md\` and its images in \`attachments/\` |

The Markdown export copies each image the note shows from the notes folder into \`attachments/\` and rewrites the links to match. It never changes the note itself. Choose a place outside your notes folder, or Margin says "Choose a folder outside the notes folder." If a folder of that name already exists and you click Replace, Margin moves the old one to the Trash first.

In an HTML or PDF export, task checkboxes are shown but cannot be clicked. An image over 20 MB stays a link. With [Load remote images](images.md#show-images-from-the-web) off in Settings, the export loads no image from the web, and neither does a browser that opens the file later.

The HTML export declares the note's language, from its \`lang\` property or else your Mac's language.

## Export as plain text

Plain text keeps your words, list markers, task boxes and table cells, with a tab between cells. It drops heading, emphasis, code and quote marks, front matter, code fences, link definitions and HTML tags. A link reads \`text (url)\`, an image reads as its alt text, a wikilink reads as its alias or its name, and each calculation line ends with \` | answer\`.

## Add a header and footer to PDFs

1. Press ⌘, and find Export and print.
2. Type a Header, a Footer or both. Use these to fill in values:

| Write | To get |
| --- | --- |
| \`\${title}\` | The note's \`title\` property, or else its title |
| \`\${author}\` | The note's \`author\` property |
| \`\${today}\` | Today's date, such as 2026-11-14 |
| \`\${pageNo}\` | The page number |
| \`\${pageCount}\` or \`\${totalPages}\` | The number of pages |
| \`\${status}\` | Any other front matter property, by its name |

Margin draws the header near the top of each page and the footer near the bottom, centered in small grey type. Both start empty. To use a different header or footer for one note, give it \`header\` and \`footer\` [properties](properties-and-bases.md#edit-a-notes-properties). An empty quoted value, \`header: ""\`, leaves the header off that note.

## Add a cover page

Add \`cover: true\` to a note's front matter, or turn on Start PDFs with a cover page in Settings to give every PDF one. A note with \`cover: false\` gets none.

The cover holds the note's title a third of the way down the page, its \`author\` property under it, and its \`date\` property or else today's date. It has no header or footer, and page numbers start from the page after it.

## Use an export template

A template sets the fonts and margins of PDFs, printed pages and HTML exports.

- Standard is Margin's own export style.
- Serif sets the text in Iowan Old Style, or Charter or Georgia, at 16 pixels with a line height of 1.6 and 54-point margins.
- Any \`.css\` file in your notes folder's \`.margin/export/\` folder is a template named for its file.

Choose a Template under Export and print in Settings. To use another template for one note, give it a \`template\` property with the template's name.

In your own template, \`@page { margin: 72pt; }\` sets the PDF's margins, from 36 to 108 points, in pt, px, in, mm or cm. A template cannot load other style sheets with \`@import\` or use web fonts. Copy as HTML, Share and Export Notes Folder… use no template.

## Export one section

1. Put the caret in a [section](outline-and-sections.md) under a heading.
2. Press ⇧⌘P and choose Export Section….
3. Choose HTML, PDF, plain text or Markdown, and save.

The section's heading becomes a level 1 heading, and its other headings move up to match. The file is named for the heading.

## Export the whole notes folder

1. Press ⇧⌘P and choose Export Notes Folder….
2. In the save panel, choose Markdown or HTML from the format menu, and a place outside the notes folder.

Margin saves the open note, then writes a folder named for your notes folder and says, for example, "Exported 412 notes and 37 files."

- Markdown copies every note exactly as it is on disk, and every file a note links to or shows, each at its own path, so links and pictures still work. Files no note names, hidden files and files iCloud has not downloaded stay out.
- HTML writes each note as a web page at the same path, with links between notes pointing at their pages, and an \`index.html\` that lists every page. Bases are left out, since they are views and not pages.

## Export the notes in the list

Search or choose a saved search first, then press ⇧⌘P and choose Export Listed Notes…. Margin writes the notes the list shows into a folder named Listed Notes, as Markdown or HTML, the same way Export Notes Folder… does. In HTML, a link to a note that was not exported leads nowhere. If the list is empty, Margin says "The list shows no notes to export."

## Export a diagram

1. Put the caret in a \` \`\`\`mermaid \` block, or in a \` \`\`\`sql \` block that [defines a table](schema-blocks.md#see-the-diagram).
2. Press ⇧⌘P and choose Export Diagram….
3. Choose SVG or PNG from the Format menu and save.

In a note with only one diagram, the caret can be anywhere. The file is named like \`Plan diagram\`. A PNG is drawn on white at two pixels a point. The exported diagram uses Mermaid's neutral theme in either appearance.

## Keep a section out of one format

In the Pandoc and All [flavors](flavors.md#what-each-flavor-reads), you can mark a section to appear only in PDFs or only in HTML:

\`\`\`markdown
::: {.content-visible when-format="pdf"}
This paragraph appears only in the PDF and in print.
:::
\`\`\`

Use \`.content-hidden\` to hide a section from a format instead, and \`unless-format\` to turn either around. \`html\` covers HTML exports and Copy as HTML. \`pdf\` covers PDFs and print. The preview shows every section, under a label such as "Only in PDF" or "In every export", so you see the whole note while you write. The Markdown export keeps the note as written.

## Print a note

Press ⌘P, or choose Print… from the note menu (⋯). Margin saves the note and prints the preview, with your header, footer, cover and template.

## Copy as HTML, Markdown or plain text

| Command | What it puts on the clipboard |
| --- | --- |
| Copy as HTML, ⌥⌘C | The rendered note as HTML, rich text and plain text |
| Copy as Markdown | The note's source as saved |
| Copy as Plain Text | The note as plain text, by the same rules as the plain text export |

Copy as HTML is in the note menu (⋯). All three are in the command palette.

## Share a note

1. Click ⋯ in the editor header and choose Share….
2. Choose Mail, Messages, AirDrop or another service.

Margin shares two things, the note as formatted text with its images and answers, and the note's \`.md\` file. Mail and Messages show the formatted text, and AirDrop sends the file.

To present a note as slides, see [Read the preview](preview.md#present-a-note-as-slides).

## See also

- [Read the preview](preview.md), for what an export draws, and to present a note as slides
- [Check a note](checks.md), to check accessibility before you export HTML
- [Images and attachments](images.md), for captions that export as figures
`,p=`---
title: Find and create notes
section: Notes
order: 1
summary: Search every note as you type, filter by date, tag or kind, and create a note from the same field.
---

# Find and create notes

One field both searches and creates. Type a few letters to find a note. If no note has that title, press Return and Margin creates it.

## Search your notes

In Margin 0.1.7 and later, press ⇧⌘P and choose Search Filters Cheat Sheet for every filter with what it finds.

1. Press ⌃⌥N to open the [panel](panel.md#open-the-panel). The search field has the keys. If you are in the editor, press ⌘L to go back to the field.
2. Type. The list filters with every key you press.

Search looks at file names, folder paths and the full text of every note. It works this way:

- Case and accents do not matter, so \`cafe\` finds "Café".
- Several words must all match, in any order.
- A phrase in quotes must match exactly.
- A single word matches the start of a word, so \`gro\` finds "Groceries".

Notes whose title matches the words exactly come first, then titles that start with them, then titles that hold every word, then headings, then body text. Among equals, the newest note wins. Each row shows the text around the first match, with the matched words in heavier type.

Search answers within 10 ms a keystroke on a folder of 5,000 notes.

## Open a note from the list

1. Press ↓ and ↑ to move through the list. The editor shows each note as you reach it.
2. Press Return to put the caret in the note.

A note you open from a search highlights the words you searched for and scrolls to the first one. Press Esc once to clear the search, and again to close the panel.

## Create a note

Do one of these:

- Type a title. When no note has exactly that title, the list ends with a \`Create "your title"\` row. Select it and press Return. If nothing matches at all, the list says "No notes match" above that row.
- Type a title and press ⌘↩. Margin creates the note even when other notes match.
- Press ⌘N, or click the New Note button under the list. The search field reads "Title for new note". Type a title and press Return. Press Return with no title to make "Untitled".
- Choose New Note from the status item's menu.
- ⌘-click a wikilink to a note that does not exist yet. See [Links and wikilinks](links.md#open-a-link).

The new note opens empty, with the caret in the editor. Margin [names the file](notes-folder.md#which-files-margin-lists) for the title. It writes \`/\` and \`:\` as \`-\`, and adds a number when the name is taken, as in "Groceries 2.md". If the list is [scoped to a folder](manage-notes.md#scope-the-list-to-a-folder), the note goes in that folder. Otherwise it goes at the top of the notes folder.

To start a note from a template, see [Slash menu, snippets and templates](slash-menu.md#start-a-note-from-a-template).

## Search with a pattern

Put a regular expression between slashes to match it anywhere in a note. \`/ar/\` finds "Harbour", and \`/\\d{4}-\\d{2}/\` finds a year and a month.

- A pattern ignores case and accents, and \`^\` and \`$\` match at the start and end of each line.
- A pattern may hold spaces. Write a slash inside one as \`\\/\`.
- Until you type the closing slash, Margin reads the term as a word.
- A pattern that does not compile matches nothing, and the list says Invalid pattern.
- A search that runs longer than one second stops, and the list says Pattern took too long.

You can mix patterns with words, phrases and filters.

## Filter by date

Type \`modified:\` or \`created:\` followed by a date.

| Type this | To find notes |
| --- | --- |
| \`modified:today\` | Changed today |
| \`modified:yesterday\` | Changed yesterday |
| \`modified:7d\` | Changed in the last 7 days, today included |
| \`created:2026-11-13\` | Created on that day |
| \`created:2026-11\` | Created that month |
| \`modified:2026\` | Changed that year |
| \`created:<2026-06\` | Created before June 2026 |
| \`created:<=2026-06\` | Created up to the end of June 2026 |
| \`modified:>2026-06-29\` | Changed after that day |
| \`modified:>=2026\` | Changed from the start of 2026 |
| \`created:2026-06-29..2026-07-25\` | Created between those days, both included |

When a note's front matter has a \`created\` or \`modified\` property that holds a date, Margin uses it. Otherwise it uses the file's own dates. A value that is not a real date, such as \`2026-02-30\`, is read as an ordinary word.

## Filter by what a note holds

Type \`kind:\` and one of these words, singular or plural.

| Type this | To find notes that |
| --- | --- |
| \`kind:images\` | Show an image |
| \`kind:files\` | Link to or embed a file that is neither a note nor a shown image, such as a PDF |
| \`kind:attachments\` | Do either of those |
| \`kind:tasks\` | Have a task |
| \`kind:todo\` | Have an open task |
| \`kind:done\` | Have tasks, none of them open |
| \`kind:code\` | Have a code block or inline code |
| \`kind:links\` | Link to another note |

Images, files, tasks and links inside a code block do not count.

## Filter by tag or property

Type \`tag:\` and a tag to find notes with that tag or a tag under it. Type a property's name, a colon and a value, such as \`status:draft\`, to find notes whose property has that value. See [Tags, properties and bases](properties-and-bases.md#filter-by-tag-or-property).

## Search headings

Start the search with \`#\` to search headings alone, across every note. Margin lists a heading that equals your words first, then one that starts with them, then one that holds them all. A note you open from this search opens at the matching heading. Type \`#\` alone to list every note that has a heading.

## Search by meaning

Start the search with \`?\` to search by meaning instead of by words. This needs Find by meaning turned on. See [AI across notes](ai-across-notes.md#search-by-meaning).

## See also

- [Find and replace](find-and-replace.md), to find text inside a note, or replace it across notes
- [Tags, properties and bases](properties-and-bases.md), to tag notes and keep a search as a base
- [Open tasks across notes](tasks.md), to list every unchecked task in one place
`,m=`---
title: Find and replace
section: Writing
order: 8
summary: Find text in a note or across every note, replace it, and use regular expressions with capture groups.
---

# Find and replace

The find bar searches the open note. Replace in Notes changes text across every note at once, and shows each changed line before it writes anything. Both can use regular expressions.

## Find text in a note

1. Press ⌘F. The find bar opens above the editor.
2. Type what you are looking for. Margin selects the first match after the caret and shows how many matches there are.
3. Press Return or ⌘G for the next match, and ⇧Return or ⇧⌘G for the one before. Both wrap around the note.

Find ignores case and accents, as note search does. To search for text you have selected, press ⌘E to put it in the find field. Press Esc or click Done to close the bar.

## Replace text in a note

1. Press ⌥⌘F. The find bar opens with a Replace field.
2. Type what to find, and what to put in its place.
3. Click Replace to change the current match and go to the next, or Replace All to change every match.

Replace All is one step of undo. A [read-only note](safety.md#notes-you-can-read-but-not-edit) can be searched but not changed.

## Use a regular expression

1. In the find bar, click the .* button, or press ⌥⌘R. The button looks pressed while patterns are on.
2. Type a JavaScript regular expression. It ignores case, and \`^\` and \`$\` match at the start and end of each line. Accents count.

A pattern that does not compile matches nothing, and the count reads Invalid pattern. With patterns on, ⌘E escapes the special characters in the selection, so ⌘G finds the text as written. The button stays as you set it until Margin quits.

The Replace field can use parts of each match:

| Write | To put in |
| --- | --- |
| \`$1\` to \`$99\` | A numbered group |
| \`$<name>\` | A named group |
| \`$&\` | The whole match |
| \`\` $\` \`\` | The text before the match |
| \`$'\` | The text after the match |
| \`$$\` | One dollar sign |

For example, find \`(\\w+) (\\w+)\` and replace with \`$2 $1\` to swap two words.

## Replace across all notes

1. Press ⇧⌘P and choose Replace in Notes….
2. Type what to find and what to replace it with. As you type, Margin counts the matches, such as "3 matches in 2 notes", and previews each changed line under each note's title. The text found is struck through and the replacement follows it.
3. Click Replace.

Margin saves the open note first, so text you just typed is replaced too. A [notice](window-tour.md#notices) says, for example, \`Replaced "oat" in 2 notes\`. Click Undo in the notice, or press ⌘Z, to put every note back, except any note that changed since.

Find matches text as typed, anywhere in a word, ignoring case and accents. Margin leaves out a note that opens read-only, and holds back a note that changed on disk since it was read, with the reason. The preview stops at 100 lines and says how many more there are.

## Use a pattern across notes

In the Replace in Notes sheet, select Regular expression. Find then reads as a pattern, with the same rules and the same \`$1\` replacements as the find bar. A match that spans lines shows each line break as ⏎.

A pattern that does not compile shows Invalid pattern in the count and cannot run. Margin gives a pattern one second to search all notes for the preview, and one second for each note when it replaces. A note still running then is held back with the reason, and a preview that runs out of time says Pattern took too long.

## Find a heading in any note

To jump to a heading in any note, start a search in the search field with \`#\`. See [Find and create notes](find-and-create.md#search-headings).

## See also

- [Tags, properties and bases](properties-and-bases.md), to rename a tag or property across notes
- [AI across notes](ai-across-notes.md), to describe a change and have AI propose it in several notes
- [Keyboard shortcuts](keyboard-shortcuts.md), for the find keys and how to change them
`,h="---\ntitle: Markdown flavors\nsection: Reading and sharing\norder: 2\nsummary: Choose which Markdown flavor Margin reads a note in, and see what another flavor would read differently.\n---\n\n# Markdown flavors\n\nA flavor is the set of Markdown extensions Margin reads in a note. The editor's highlighting and the [preview](preview.md) always use the same flavor, so what you see while typing matches what renders. Margin reads six flavors: CommonMark, GitHub, Obsidian, Pandoc, MultiMarkdown and All. All is the default.\n\n## Set the default flavor\n\n1. Press ⌘, to open [Settings](settings.md#editor).\n2. Under Editor, choose a Default Markdown flavor.\n\nEvery note without a flavor of its own uses it.\n\n## Set a note's flavor\n\nAdd a `flavor` property to the note's [front matter](properties-and-bases.md#edit-a-notes-properties):\n\n```yaml\n---\nflavor: github\n---\n```\n\nThe values are `commonmark`, `github`, `obsidian`, `pandoc`, `multimarkdown` and `all`. The preview and highlighting switch as soon as you type it.\n\n## What each flavor reads\n\nEvery flavor reads CommonMark 0.31.2: headings, lists, code, links and HTML blocks. Every flavor also highlights [fenced code](code-blocks.md) by its language, and shows raw HTML after removing anything unsafe.\n\n| Extension | Syntax | CommonMark | GitHub | Obsidian | Pandoc | MultiMarkdown | All |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| [Tables](tables.md) | pipe tables | | yes | yes | yes | | |\n| Tables with merged cells and captions | MultiMarkdown tables | | | | | yes | yes |\n| Strikethrough | `~~x~~` | | yes | yes | yes | yes | yes |\n| Single-tilde strikethrough | `~x~` | | yes | | | | yes |\n| Task lists | `- [ ]`, `- [x]` | | yes | yes | yes | | yes |\n| Bare web addresses as links | `www.` and URLs, emails | | yes | yes | | | yes |\n| Footnotes | `[^1]`, inline `^[x]` | | yes | yes | yes | yes | yes |\n| Front matter | YAML `---`, TOML `+++` | | yes | yes | yes | yes | yes |\n| Math | `$x$`, `$$x$$`, `\\(x\\)`, `\\[x\\]`, ` ```math ` | | yes | yes | yes | yes | yes |\n| Mermaid diagrams | ` ```mermaid ` | | yes | yes | | | yes |\n| GitHub alerts | `> [!NOTE]` | | yes | | | | yes |\n| Callouts, foldable | `> [!tip]- Title` | | | yes | | | yes |\n| Admonitions | `!!! note \"Title\"`, `??? note`, `:::note` | | | | | | yes |\n| [Wikilinks and embeds](links.md) | `[[Note]]`, `[[Note\\|alias]]`, `[[Note#Heading]]`, `![[image.png]]` | | | yes | | | yes |\n| Tags | `#tag` | | | yes | | | yes |\n| Comments | `%%hidden%%` | | | yes | | | yes |\n| Highlight | `==x==` | | | yes | | yes | yes |\n| Superscript | `^x^` | | | | yes | yes | yes |\n| Subscript | `~x~` | | | | yes | yes | |\n| Definition lists | `Term` then `: Definition` | | | | yes | yes | yes |\n| Abbreviations | `*[HTML]: Hyper Text` | | | | | yes | yes |\n| Inserted text | `++x++` | | | | | | yes |\n| Emoji shortcodes | `:tada:` | | yes | | | | yes |\n| Attributes | `{#id .class}` | | | | yes | | yes |\n| Cross-references | `{#fig:id}`, `{#eq:id}`, `{#tbl:id}`, `@fig:id` | | | | yes | | yes |\n| Heading anchors | automatic ids | | yes | yes | yes | yes | yes |\n| [Table of contents](outline-and-sections.md#add-a-table-of-contents) | `[TOC]`, `[[_TOC_]]`, `{{TOC}}` | | | | | yes | yes |\n| A single Return is a line break | | | | yes | | | |\n| Smart quotes and dashes | | | | | yes | | |\n| CriticMarkup | `{++ ++}`, `{-- --}`, `{~~ ~> ~~}`, `{== ==}`, `{>> <<}` | | | | | yes | yes |\n| [Sections for one export format](export.md#keep-a-section-out-of-one-format) | `::: {.content-visible when-format=\"pdf\"}` | | | | yes | | yes |\n\nAttributes read only an id, a class, a width and a height.\n\n## When flavors disagree\n\n- `~x~` is strikethrough in GitHub and subscript in Pandoc and MultiMarkdown. All follows GitHub. Choose Pandoc or MultiMarkdown for subscript.\n- `> [!type]` is a GitHub alert in GitHub and an Obsidian callout in Obsidian and All. Callouts take GitHub's five alert types too, so a GitHub note reads the same in All.\n- A single Return makes a line break only in Obsidian.\n- Smart quotes and dashes are on only in Pandoc, because they rewrite the quotes and dashes you typed.\n- A `$$` block or a `%%` comment that never closes runs to the end of its container, the way an unclosed code fence does.\n- A `---` at the top of a note with no closing line is a horizontal rule, not front matter.\n\n## Compare flavors\n\nTo see what another flavor would read differently in the open note:\n\n1. Press ⇧⌘P and choose Compare flavors.\n2. The list shows each flavor the note is not read in, with how many places would render differently and the line of the first.\n3. Choose a row to see which extensions cause the differences, each with a count and its first line.\n4. Press Return to go to the first place, or press ⌘↩ to use that flavor for this note.\n\nUse for this note sets `flavor:` in the note's front matter, and adds front matter if the note has none, in one step of undo. It is not offered for CommonMark, which shows front matter as text, for a note with TOML front matter, or for a read-only note. The list's last line names the flavor the note is read in now.\n\nMargin does not compare a note over 100,000 characters.\n\n## What Margin does not render\n\nThese show as plain code or text:\n\n- Pandoc citations.\n- MDX's JSX. The Markdown around it still renders.\n- R Markdown and Quarto code, which Margin does not run.\n- PlantUML and Graphviz diagrams, which need tools Margin does not include.\n\n## See also\n\n- [Read the preview](preview.md), for how math, diagrams, callouts and cross-references draw\n- [Write and edit](editor.md), for highlighting and hidden marks as you type\n- [Export, print and share](export.md), to export a note as HTML, PDF or Markdown\n",ee=`---
title: Format text
section: Writing
order: 2
summary: Apply bold, headings, lists and links with keys or the format bar, and choose how pasted text arrives.
---

# Format text

Margin writes formatting as [Markdown marks](editor.md#hide-markdown-marks), so \`**bold**\` is what lands in the file. Use the keys or the format bar to add marks, and the same keys again to take them off.

In Margin 0.1.6 and later, press ⇧⌘P and choose Markdown Cheat Sheet for every mark Margin reads, with the key that writes each one and a filter.

## Use the formatting keys

| Keys | Command |
| --- | --- |
| ⌘B | Bold |
| ⌘I | Italic |
| ⇧⌘X | Strikethrough |
| ⇧⌘C | Inline code |
| ⌘K | Link |
| ⌥⌘1 to ⌥⌘6 | Heading 1 to Heading 6 |
| ⌥⌘0 | Paragraph |
| ⇧⌘8 | Bullet list |
| ⇧⌘7 | Numbered list |
| ⇧⌘T | Task item |
| ⇧⌘L | Toggle the checkbox |
| ⇧⌘K | Fenced code block |

A key wraps the selection in marks, or puts the marks in at the caret. Press it on text that already has the marks to take them off. Spaces at the edges of a selection stay outside the marks.

The heading, list and task keys act on every line you select, and skip lines inside a [code block](code-blocks.md). A list key takes the list off when every selected line already has it. ⇧⌘K inside a fenced block takes the fences off.

## Use the format bar

When you select text in ordinary prose by dragging or double-clicking, the format bar appears above it. It holds Bold, Italic, Strikethrough, Code and Link, and an AI button when [AI](ai.md#run-an-ai-command) is on. A button looks pressed when the whole selection already has that format. Rest the pointer on a button to see its name and keys, such as "Bold ⌘B".

Each button runs the same command as its key, so one ⌘Z undoes it. The bar hides when you press a key, press Esc, scroll or click elsewhere. It does not appear over code, math or front matter, or for a selection made with the keys, unless [Edit Without Marks](edit-without-marks.md#change-a-block-from-the-format-bar) is on.

## Arrange the format bar

1. Press ⌘, and open the [Menus pane](settings.md#menus).
2. In the list of format bar buttons, select the checkbox of each button you want to show. Bold, Italic, Strikethrough, Code and Link show at first. Headings 1 to 6, Paragraph, Bullet list, Numbered list, Task item and Fenced code block are there to add.
3. Use Move Up and Move Down to change the order.

Click Restore Defaults to go back to the first five buttons. The bar shows each added button as a short glyph, such as H2, ¶, •, 1., ☐ or { }.

## Turn a heading back into text

Put the caret at the start of a heading's text and press Delete. Margin removes the heading's marks, so \`## Title ##\` becomes \`Title\`, in one step of undo. Delete works the same way at the start of a list item or a quote line.

## Paste formatted text

When you paste rich text from a web page or another app, Margin turns it into Markdown. A small menu then appears under the caret with three choices:

- Keep Formatting, the full conversion.
- Clean Markdown, which keeps headings, lists, task boxes, quotes, code, tables and links, and drops emphasis, strikethrough and images.
- Plain Text, the clipboard's own text.

Choose one to replace the paste with that version. The menu stays until your next edit or Esc, and one ⌘Z takes you back to the note before the paste.

A few kinds of paste get special handling:

- Markdown copied as plain text pastes as written, marks and all. So does Markdown that a page sets in plain paragraphs.
- A code block copied from a chat or a developer tool pastes as one fenced block with its language, without the copy button's text.
- Cells copied from Numbers or Excel paste as a table. See [Tables](tables.md#paste-cells-from-a-spreadsheet).
- Several lines pasted into a list item continue the list. See [Lists and tasks](lists-and-tasks.md#paste-into-a-list).
- An image that came only as embedded data is left out, and Margin says how many it left out.

## Paste plain text

Press ⌥⇧⌘V to paste the clipboard's plain text with no conversion.

## Turn a selection into a link

Select text and press ⌘K, or paste a web address over it. See [Links and wikilinks](links.md#add-a-link).

## See also

- [Keyboard shortcuts](keyboard-shortcuts.md), for every key, and how to change one
- [Slash menu, snippets and templates](slash-menu.md), to insert headings, lists and other blocks by name
- [Import notes and documents](import.md), to turn whole documents into notes
`,g=`---
title: Images and attachments
section: Writing
order: 5
summary: Add images by pasting, dropping or choosing a file, write alt text and captions, and recover missing files.
---

# Images and attachments

Margin stores images as files in your notes folder and links to them from the note, so any Markdown app can show them. It shows each image in the editor and the preview.

## Add an image

Paste an image, or drag one into a note. Margin saves it in the [attachments folder](notes-folder.md#set-the-attachments-folder) under a name made from the date and time, such as \`2026-11-14 09.30.12.png\`, and puts a link to it at the caret. The link is relative to the note's folder.

Margin takes PNG, JPEG, GIF, WebP, HEIC and TIFF images up to 20 MB. When the clipboard holds an image and text, the image wins.

## Insert an image without dragging

1. Put the caret where the image should go.
2. Press ⇧⌘P and choose Insert Image….
3. Choose an image file.

Margin copies the image into the attachments folder, as it does for a paste, and puts the link at the caret.

## See images in the editor

A line that holds an image, \`![alt](path)\` or \`![[image.png]]\`, shows the image under the line, up to 320 pixels tall. With [Markdown marks hidden](editor.md#hide-markdown-marks), the syntax hides when the caret is elsewhere, so the image stands alone.

An image that does not load shows "Image not found" and its path. If you copy the file in later, the image appears the next time its line redraws.

## Add alt text and a caption

Alt text describes an image for a reader who cannot see it. A caption shows under the image.

1. Put the caret on the image.
2. Press ⇧⌘P and choose Alt text and caption….
3. Type the alt text, then the caption.
4. Click Save or press Return. Press Esc or click Cancel to leave the image as it was.

Margin writes the caption as the image's Markdown title, \`![alt](path "caption")\`. The editor shows it under the image. The preview and every export show the image as a figure with the caption under it. Clear the caption field to remove the caption.

If the caret is not on an image with a path, Margin says "Put the caret on an image that has a path."

To number figures, such as "Figure 1", see [Read the preview](preview.md#number-figures-equations-and-tables).

## Show images from the web

Margin shows images from web addresses in the editor and the preview while Load remote images is on in [Settings](settings.md#editor), which it is at first. Turn it off, and Margin [loads no image from the web](privacy.md#when-margin-goes-online), in the editor, the preview or an export.

## Restore a missing attachment

Margin never deletes an attachment itself, but a file can go missing through Finder, a sync service or another app. If a backup still holds it, you can get it back.

1. Press ⇧⌘P and choose [Note Health](links.md#fix-broken-links).
2. A missing image or file that a backup holds shows a Restore button. Its tooltip names the backup, such as "From the backup of Today 10:30".
3. Click Restore.

Margin puts the file back at its old path without overwriting anything, and says, for example, "Restored attachments/pier.png". The image shows again in the editor and the preview. See [How Margin keeps your notes safe](safety.md#backups).

## Export a note with its images

To send a note somewhere else with its pictures, export it as Markdown. Margin copies each image into an \`attachments/\` folder beside the note. See [Export, print and share](export.md#export-a-note).

## See also

- [Check a note](checks.md), to find every image that has no alt text
- [Edit Without Marks](edit-without-marks.md), to work with an image line as one block
- [Export, print and share](export.md), to export a note with its images bundled
`,_=`---
title: Import notes and documents
section: Notes
order: 3
summary: Turn Word, RTF, HTML and other documents into notes, and bring in folders of notes from other apps.
---

# Import notes and documents

Import… turns other files into Markdown notes in your notes folder. It copies each original beside the new note and tells you what Markdown could not keep. Nothing inside an imported document runs or loads.

## Import a document

1. Press ⇧⌘P and choose Import….
2. Choose one or more files. Margin takes HTML, plain text, RTF, RTFD, OpenDocument and Word files.

Each file becomes a note named for the file, in the [folder the list shows](manage-notes.md#scope-the-list-to-a-folder). The last one opens.

## What an imported note holds

An imported note opens with a [callout](preview.md#use-alerts-and-callouts) that says where it came from, such as \`> [!note] Imported from Trip.rtf\`. Under it:

- A \`Not kept:\` line counts what Markdown could not hold.
- A line notes any headings Margin worked out from text size.
- A link to the original, such as \`The original is [Trip.rtf](attachments/Trip.rtf).\`

A plain text file gets no callout.

Margin copies the original into the [attachments folder](notes-folder.md#set-the-attachments-folder), under its own name, and writes the document's images there too. The file you chose stays where it was.

Margin keeps paragraphs, headings, nested lists, tables, links, bold, italic, struck text, code and images. It counts and drops text color, highlight, underline that is not a link's, raised and lowered text, paragraph alignment, merged table cells and embedded items, and keeps their text. It never keeps fonts, sizes or layout. In an HTML file, images stay where the file pointed.

macOS's document reader marks no headings, so Margin makes a heading of any line set at least 1.15 times larger than most of the text. The largest size becomes level 1, the next level 2, and so on to level 6.

## Import a Word file

Margin reads \`.docx\` files itself, so a Word file keeps more:

- Headings come from Word's heading styles, Title and outline levels. Levels past 6 become level 6.
- Lists keep their depth and their kind.
- Links keep their addresses. A link to a bookmark inside the file stays as its text.
- Footnotes and endnotes become Markdown footnotes.
- Images keep their descriptions as [alt text](images.md#add-alt-text-and-a-caption).
- Text deleted under tracked changes is left out, and text inserted is kept.

The callout also counts tracked changes, comments, headers and footers that hold text, and drawn items such as shapes, text boxes, charts and equations.

A \`.doc\` file, or a \`.docx\` file Margin cannot read itself, goes through macOS's reader. Its callout says \`macOS read this Word file for Margin. It passes on no link targets and no heading styles.\`

## Import notes from another app

Import… also takes a folder, a zip, a TextBundle, a TextPack or a Markdown file. That covers an Obsidian vault, a Notion export, Bear's Markdown and TextBundle exports, and notes exported from Apple Notes.

- A folder or a zip becomes a new folder where the list is, named for what you chose. Its tree stays the same, so links and images between its files still work.
- A Markdown file becomes a note as it is.
- A TextBundle becomes a note named for the bundle, beside a folder that holds its assets.

Margin cleans up as it copies:

- It leaves out files and folders whose names start with a dot, \`__MACOSX\`, \`node_modules\`, a TextBundle's \`info.json\`, and symbolic links.
- It drops one outer folder that wraps everything, as many zips add.
- It takes the 32-character id off the end of names that Notion exports.
- It points each Markdown [link](links.md) and image at its file's new place.

A note named "Imported from" and the folder's name opens when the import is done. It counts the notes and files that came, the names that lost an id, the links Margin rewrote, the links that point at a file that did not come, and the files left behind.

## Import an Evernote export

1. In Evernote, export your notes as an \`.enex\` file.
2. In Margin, press ⇧⌘P, choose Import… and choose the \`.enex\` file.

The notes land in a new folder named for the file. Each note is named for its title, has its [tags](properties-and-bases.md#add-tags) as a \`tags:\` list in its front matter, and is dated as Evernote last changed it. Images show in the note, other files become links, and to-dos become [tasks](lists-and-tasks.md). Images and files go into the attachments folder.

Margin leaves out encrypted passages. Links between Evernote notes stay as written, since the export has no way to tell which note a link meant. The "Imported from" note counts the notes, the images and files, the encrypted passages and those links.

## Limits

- Margin refuses a zip of more than 20,000 files.
- A folder or zip with no note in it brings nothing in.
- When Margin cannot import a file, a notice says why and no note is written.

To paste formatted text instead of importing a file, see [Format text](formatting.md#paste-formatted-text).

## See also

- [Format text](formatting.md), to paste formatted text instead of importing a file
- [Set up your notes folder](notes-folder.md), for where imported notes and their originals go
- [Export, print and share](export.md), to send notes back out as HTML, PDF or Markdown
`,te=`---
title: Install Margin
section: Get started
order: 1
summary: Install Margin with Homebrew, open it for the first time, and keep it up to date.
---

# Install Margin

Margin is a Markdown notebook that lives in the macOS menu bar. You install it with Homebrew, open it once, and pick the folder your notes live in. After that, one click or one key opens it from any app.

## Check what you need

- A Mac with macOS 26 or later.
- [Homebrew](https://brew.sh).

Margin is signed with a Developer ID and notarized by Apple.

## Install with Homebrew

1. Open Terminal.
2. Add Margin's tap:

   \`\`\`sh
   brew tap tayler-id/margin
   \`\`\`

3. Trust the tap:

   \`\`\`sh
   brew trust tayler-id/margin
   \`\`\`

4. Install the app:

   \`\`\`sh
   brew install --cask margin
   \`\`\`

Homebrew puts Margin in your Applications folder and the \`margin\` command on your PATH. Coding agents use that command to search and read your notes. See [Connect a coding agent](agents.md).

## Open Margin for the first time

Homebrew installs Margin but does not open it, so nothing shows until you open it once. From Margin 0.1.6 it has a Dock icon too, which opens the panel.

1. Press ⌘Space, type Margin and press Return, or open Margin from the Applications folder. If macOS says Margin was downloaded from the internet, click Open.
2. Margin 0.1.5 and later drop the [panel](panel.md#open-the-panel) down by themselves. In 0.1.4, click Margin's icon in the menu bar, or press ⌃⌥N.
3. Margin asks for a notes folder inside the panel and suggests \`~/Documents/Margin\`. Confirm it, or choose another folder. See [Set up your notes folder](notes-folder.md).

To read this guide inside Margin, choose Margin Help in the status item's menu, the panel's ⋯ menu or the [command palette](window-tour.md#the-command-palette), in Margin 0.1.5 and later. Its Open in Browser button shows the same page on this site.

If you cannot see Margin's icon in the menu bar, press ⌃⌥N, which opens Margin from any app, and see [Margin's icon is not in the menu bar](troubleshooting.md#margins-icon-is-not-in-the-menu-bar).

The first time you open Margin from the Applications folder, it turns on Launch at Login. If macOS holds the request for approval, Margin tells you to allow it in System Settings, under General and then Login Items. If you turn Launch at Login off later, in [Settings](settings.md#startup-and-the-panel) or in the status item's menu, it stays off.

## Update Margin

From Margin 0.1.6, Margin checks once a day for a new version. When one is ready, an Update to button shows in the editor's footer and at the top of Margin's menu in the menu bar. Click it, and Margin shows what changed and installs the new version, after it checks that Apple notarized the download and that you signed it. Choose Check for Updates… in the same menu to look now. To stop the daily check, turn off Check for updates once a day in [Settings](settings.md#startup-and-the-panel). See [Privacy and network use](privacy.md#when-margin-goes-online).

The button shows only while a newer version waits, so the newest version has none. To see which version you have, choose About Margin in Margin's menu, in the menu bar or the status item's menu, in Margin 0.1.7 and later. In 0.1.6, select Margin in the Applications folder and press ⌘I.

Margin 0.1.5 and earlier have no update button. Run \`brew upgrade --cask margin\` in Terminal, and Homebrew installs the new version.

## Uninstall Margin

- To remove the app, run \`brew uninstall --cask margin\`. Homebrew quits Margin first if it is running.
- To also remove Margin's own data, run \`brew uninstall --zap --cask margin\`. This moves Margin's Application Support folder, its caches, its preferences and its WebKit data to the Trash.

Your notes folder stays where it is either way. Margin keeps its [snapshots and backups](safety.md#backups) in the Application Support folder, so \`--zap\` moves those to the Trash too. Copy them somewhere else first if you want to keep them.

## See also

- [Set up your notes folder](notes-folder.md), to choose the folder Margin reads and which files it lists
- [Open and close the panel](panel.md), to open, pin, resize and quit the panel
- [A tour of the window](window-tour.md), for the search field, the note list, the editor and the command palette
`,ne='---\ntitle: Keyboard shortcuts\nsection: Reference\norder: 1\nsummary: Look up every default key in Margin by area, and change any of them in Settings or keybindings.json.\n---\n\n# Keyboard shortcuts\n\nThese are Margin\'s default keys, grouped as the [shortcut sheet](window-tour.md#the-shortcut-sheet) groups them. Press ⌘/ in Margin to see the same list with any keys you have changed. The id beside each command is the name to use in `keybindings.json` and `.margin/hooks.json`.\n\nA key that macOS\'s text system already uses inside a text view keeps its macOS meaning in the editor. The [Shortcuts pane](settings.md#shortcuts) in Settings tells you when that happens.\n\n## Global\n\n| Keys | Command |\n| --- | --- |\n| ⌃⌥N | Open or close the panel from any app. [Change it in Settings](panel.md#change-the-global-shortcut). |\n\n## Note\n\n| Keys | Command | Id |\n| --- | --- | --- |\n| ⌘N | New Note | `native.newNote` |\n| ⌘R | Rename Note | `native.renameNote` |\n| ⌘⌫ | Move to Trash, from the list or search field | `native.trashNote` |\n| ⌥⌘P | Pin Note | `native.togglePinNote` |\n| ⇧⌘R | Reveal in Finder | `native.revealNote` |\n| ⌘L | Find Notes, which puts the keys in the search field | `native.focusSearch` |\n| ⌘↩ | Create Note from Search | `native.createFromSearch` |\n| ⌘P | Print… | `native.printNote` |\n\n## View\n\n| Keys | Command | Id |\n| --- | --- | --- |\n| ⌘\\ | Show or Hide Note List | `native.toggleList` |\n| ⌃⌘S | Show or Hide Folders | `native.toggleFolders` |\n| ⌘1 | Editor | `native.showEditor` |\n| ⌘2 | Editor and Preview | `native.showEditorAndPreview` |\n| ⌘3 | Preview | `native.showPreview` |\n| ⌘+ or ⌘= | Bigger | `native.biggerText` |\n| ⌘- | Smaller | `native.smallerText` |\n| ⌘0 | Actual Size | `native.actualSizeText` |\n| ⇧⌘M | Hide Markdown Syntax | `native.toggleHideSyntax` |\n| ⌘D | Focus Mode | `native.toggleFocusMode` |\n| ⌥⌘T | Typewriter Scrolling | `native.toggleTypewriter` |\n| ⌘[ | Back | `native.goBack` |\n| ⌘] | Forward | `native.goForward` |\n| ⌘/ | Keyboard Shortcuts | `native.showShortcuts` |\n| ⇧⌘P | Command Palette… | `native.showPalette` |\n| ⌥⌘[ | Fold section | `editor.foldSection` |\n| ⌥⌘] | Unfold section | `editor.unfoldSection` |\n\n## Window\n\n| Keys | Command | Id |\n| --- | --- | --- |\n| ⌘W | Close Panel | `native.closePanel` |\n| ⌃⌘P | Pin Panel | `native.togglePin` |\n| ⌃⌘F, Globe-F or ⇧⌘F | Enter Full Screen | `native.toggleFullScreen` |\n| ⌘T | New Tab | `editor.newTab` |\n| ⇧⌘W | Close Tab | `editor.closeTab` |\n| ⇧⌘] | Next Tab | `editor.nextTab` |\n| ⇧⌘[ | Previous Tab | `editor.previousTab` |\n\n## Edit\n\n| Keys | Command | Id |\n| --- | --- | --- |\n| ⌘Z | Undo | `native.undo` |\n| ⇧⌘Z | Redo | `native.redo` |\n| ⌘X | Cut | `native.cut` |\n| ⌘C | Copy | `native.copy` |\n| ⌘V | Paste | `native.paste` |\n| ⌥⇧⌘V | Paste and Match Style, which pastes plain text | `native.pasteAsPlainText` |\n| ⌘A | Select All | `native.selectAll` |\n| ⌥⌘C | Copy as HTML | `native.copyAsHTML` |\n| ⌥⇧⌘C | Copy Answer | `editor.copyAnswer` |\n| ⌃⇧⌘→ | Expand selection | `editor.expandSelection` |\n| ⌃⇧⌘← | Shrink selection | `editor.shrinkSelection` |\n\n## Search field\n\nThese keys work while the [search field](find-and-create.md#search-your-notes) has the keys, and cannot be changed.\n\n| Keys | Command |\n| --- | --- |\n| ↓ | Select the next note |\n| ↑ | Select the previous note |\n| ↩ | Open the note, or create one |\n| Esc | Clear the search, then close the panel |\n\n## Format\n\n| Keys | Command | Id |\n| --- | --- | --- |\n| ⌘B | Bold | `editor.bold` |\n| ⌘I | Italic | `editor.italic` |\n| ⇧⌘X | Strikethrough | `editor.strikethrough` |\n| ⇧⌘C | Inline code | `editor.inlineCode` |\n\n## Blocks\n\n| Keys | Command | Id |\n| --- | --- | --- |\n| ⌥⌘1 to ⌥⌘6 | Heading 1 to Heading 6 | `editor.heading1` to `editor.heading6` |\n| ⌥⌘0 | Paragraph | `editor.paragraph` |\n| ⇧⌘8 | Bullet list | `editor.bulletList` |\n| ⇧⌘7 | Numbered list | `editor.numberedList` |\n| ⇧⌘T | Task item | `editor.taskItem` |\n| ⇧⌘L | Toggle the checkbox | `editor.toggleCheckbox` |\n| ⇧⌘K | Fenced code block | `editor.fence` |\n| ⌥⌘↑ | Move section up | `editor.moveSectionUp` |\n| ⌥⌘↓ | Move section down | `editor.moveSectionDown` |\n| ⌃⇧⌘↑ | Move block up | `editor.moveBlockUp` |\n| ⌃⇧⌘↓ | Move block down | `editor.moveBlockDown` |\n| ⇧⌘↩ | Run SQL block | `editor.runQuery` |\n\n## Lists\n\nThese keys act where the caret is, and cannot be changed.\n\n| Keys | Command |\n| --- | --- |\n| ↩ | Continue a list or quote |\n| ⌫ | Remove a list, quote or heading mark |\n| Tab | Nest a list item |\n| ⇧Tab | Unnest a list item |\n\n## Links\n\n| Keys | Command | Id |\n| --- | --- | --- |\n| ⌘K | Link | `editor.link` |\n| ⌘-click | Open a link. Cannot be changed. | |\n| `[[` | Link to a note. Cannot be changed. | |\n\n## Find\n\n| Keys | Command | Id |\n| --- | --- | --- |\n| ⌘F | Find | `editor.find` |\n| ⌥⌘F | Find and replace | `editor.findReplace` |\n| ⌘G | Find next | `editor.findNext` |\n| ⇧⌘G | Find previous | `editor.findPrevious` |\n| ⌘E | Use selection for find | `editor.useSelection` |\n| ⌥⌘R | Regular expressions in find | `editor.findPattern` |\n| ⇧⌘O | Outline | `editor.outline` |\n| Esc | Close find or outline. Cannot be changed. | |\n\n## AI\n\n| Keys | Command | Id |\n| --- | --- | --- |\n| ⌘J | AI Commands, while AI is on | `ai.menu` |\n\n## Margin\n\n| Keys | Command | Id |\n| --- | --- | --- |\n| ⌘, | Settings… | `native.showSettings` |\n| ⌘Q | Quit Margin | `native.terminate` |\n\n## Keys inside lists and sheets\n\nSome lists have keys of their own, which work only while the list is open. Each page lists them:\n\n- The Review list\'s Explain, Apply Fix, Dismiss and Propose Fix. See [Review SQL](schema-review.md).\n- Use for this note in Compare flavors. See [Markdown flavors](flavors.md#compare-flavors).\n- Accepting an AI proposal. See [AI in a note](ai.md#review-a-proposal).\n- Moving through slides. See [Read the preview](preview.md#present-a-note-as-slides).\n\n## Change a shortcut\n\n1. Press ⌘, and open the Shortcuts pane.\n2. Find the command. The filter ignores case and accents.\n3. Click the command\'s keys and press the new chord. A chord needs ⌘, ⌃ or ⌥.\n\nPress Esc to cancel, or Delete to remove the command\'s key. Click Reset beside a command to give it back its default key, or Reset All to restore every default. When two commands share a chord, the pane names both. Every command except the fixed ones above is listed, including those with no default key.\n\n## Edit keybindings.json\n\nMargin keeps your changes in `~/Library/Application Support/Margin/keybindings.json`. You can edit it by hand:\n\n```json\n{\n  "version": 1,\n  "bindings": {\n    "editor.formatDocument": [{ "key": "f", "mods": ["ctrl", "alt"] }],\n    "editor.findPattern": null\n  }\n}\n```\n\nThis file gives [Format document](editor.md#tidy-a-note) the keys ⌃⌥F and takes ⌥⌘R away from [Regular expressions in find](find-and-replace.md#use-a-regular-expression). `null` removes a command\'s key. The modifiers are `cmd`, `ctrl`, `alt`, `shift` and `fn`. Margin reads the file when it starts and whenever the file changes. If the file has a mistake, Margin keeps the default keys and the Shortcuts pane shows the reason. Before Settings writes over a file that does not read, it moves it to `keybindings.json.bad`, so your work is not lost.\n\n## Commands with no default key\n\nThese commands are in the palette and have no key until you give them one. Use their ids in `keybindings.json` or `.margin/hooks.json`.\n\n| Command | Id |\n| --- | --- |\n| Properties | `note.properties` |\n| New Note from Template… | `note.newFromTemplate` |\n| Note Health | `native.showNoteHealth` |\n| Share… | `native.shareNote` |\n| Import… | `native.importDocument` |\n| Insert Image… | `native.insertImage` |\n| Export… | `native.exportNote` |\n| Export Diagram… | `native.exportDiagram` |\n| Export Notes Folder… | `native.exportNotesFolder` |\n| Export Listed Notes… | `native.exportListedNotes` |\n| Rename Tag… | `native.renameTag` |\n| Rename Property… | `native.renameProperty` |\n| Set Property on Listed Notes… | `native.setPropertyOnListedNotes` |\n| Replace in Notes… | `native.replaceInNotes` |\n| Copy as Markdown | `native.copyAsMarkdown` |\n| Copy as Plain Text | `native.copyAsPlainText` |\n| Larger Panel | `native.largerPanel` |\n| Smaller Panel | `native.smallerPanel` |\n| Default Panel Size | `native.defaultPanelSize` |\n| Edit Without Marks | `native.toggleEditWithoutMarks` |\n| Show Authorship | `native.toggleAuthorship` |\n| Unfold all sections | `editor.unfoldAll` |\n| Show in preview | `editor.showInPreview` |\n| Line breaks | `editor.lineBreaks` |\n| Compare flavors | `editor.compareFlavors` |\n| Start Presentation | `editor.startPresentation` |\n| Pin Reference Note… | `editor.pinReference` |\n| Unpin Reference Note | `editor.unpinReference` |\n| Layouts… | `editor.layouts` |\n| Save Layout… | `editor.saveLayout` |\n| Browse Backups… | `editor.browseBackups` |\n| Open Tasks… | `editor.openTasks` |\n| Format document | `editor.formatDocument` |\n| Format Code Blocks | `editor.formatCodeBlocks` |\n| Check Front Matter | `editor.checkFrontMatter` |\n| Check Style | `editor.checkStyle` |\n| Check Agent Files | `editor.checkAgentFiles` |\n| Agent Context | `editor.agentContext` |\n| Check Accessibility | `editor.checkAccessibility` |\n| Record Macro | `macro.record` |\n| Stop Recording | `macro.stop` |\n| Copy Unformatted Answer | `calc.copyUnformattedAnswer` |\n| Copy with Answers | `calc.copyWithAnswers` |\n| Insert Answer | `calc.insertAnswer` |\n| Alt text and caption… | `editor.imageText` |\n| Rename heading… | `editor.renameHeading` |\n| Move Section to New Note… | `editor.moveSection` |\n| Promote Section | `editor.promoteSection` |\n| Demote Section | `editor.demoteSection` |\n| Set Code Language… | `editor.setCodeLanguage` |\n| Export Section… | `editor.exportSection` |\n| Restore Section from Snapshot… | `editor.restoreSection` |\n| Compare with Snapshot… | `editor.compareWithSnapshot` |\n| Go to Definition | `schema.goToDefinition` |\n| Find References | `schema.findReferences` |\n| Expand Abbreviation | `schema.expandAbbreviation` |\n| Copy as SQLite | `schema.copyAsSQLite` |\n| Copy as MySQL | `schema.copyAsMySQL` |\n| Copy as DBML | `schema.copyAsDBML` |\n| Copy as Data Dictionary | `schema.copyAsDictionary` |\n| Rename Table or Column… | `schema.rename` |\n| Review | `schema.review` |\n| Import Schema | `database.importSchema` |\n| Compare with Database | `database.compare` |\n| Read Table Sizes | `database.readSizes` |\n| Run Plan | `database.runPlan` |\n| Run Plan with ANALYZE | `database.runPlanAnalyze` |\n| Add Table Row Above | `table.insertRowAbove` |\n| Add Table Row Below | `table.insertRowBelow` |\n| Delete Table Row | `table.deleteRow` |\n| Duplicate Table Row | `table.duplicateRow` |\n| Move Table Row Up | `table.moveRowUp` |\n| Move Table Row Down | `table.moveRowDown` |\n| Add Table Column Before | `table.insertColumnLeft` |\n| Add Table Column After | `table.insertColumnRight` |\n| Delete Table Column | `table.deleteColumn` |\n| Duplicate Table Column | `table.duplicateColumn` |\n| Move Table Column Left | `table.moveColumnLeft` |\n| Move Table Column Right | `table.moveColumnRight` |\n| Align Table Column Left | `table.alignLeft` |\n| Align Table Column Center | `table.alignCenter` |\n| Align Table Column Right | `table.alignRight` |\n| Clear Table Column Alignment | `table.alignNone` |\n| Sort Table by Column, Ascending | `table.sortAscending` |\n| Sort Table by Column, Descending | `table.sortDescending` |\n| Convert Table to CSV | `table.toCsv` |\n| Convert CSV or TSV to Table | `table.fromDelimited` |\n\n## See also\n\n- [Plugins, macros and hooks](plugins.md), to run a command by its id when a note saves or opens\n- [Settings](settings.md), for the Shortcuts pane and every other setting\n- [Troubleshooting](troubleshooting.md), when a shortcut does nothing\n',re=`---
title: Links and wikilinks
section: Writing
order: 4
summary: Link to web pages and other notes, preview and follow links, and see which notes link to the one you are in.
---

# Links and wikilinks

Margin reads two kinds of links between notes: wikilinks such as \`[[Plan]]\`, and ordinary Markdown links to a \`.md\` file. It keeps a map of every link in your notes, so it can show what links to a note, fix links when you [rename one](manage-notes.md#rename-a-note), and find links that lead nowhere.

## Add a link

- Select text and press ⌘K. The text becomes the link's text, and Margin selects the place for the address so you can type or paste it.
- Select a web address and press ⌘K. The address becomes both the text and the target, with the text selected so you can type over it.
- Select text and paste a web address over it. The text becomes a link to that address.
- Put the caret in a link, or in its text, and press ⌘K to take the link off.

A paste counts as a web address when it is a single \`http\`, \`https\`, \`mailto\` or \`www.\` address with no spaces. A paste into code or into a link stays text.

## Link to another note

1. Type \`[[\`. A list of note titles opens.
2. Type to narrow the list.
3. Press Return to put in the wikilink and its closing brackets.

Press Esc to close the list. When two notes share a title, the list shows each one's folder and the link names the note by its path.

A wikilink can point at a heading, \`[[Plan#Budget]]\`, or show other text, \`[[Plan|the plan]]\`. Wikilinks work in the Obsidian and All flavors, and the list does not open in code. See [Markdown flavors](flavors.md).

## Open a link

⌘-click a link in the editor, or click it in the [preview](preview.md#click-in-the-preview).

- A web address opens in your default browser.
- A wikilink or a relative \`.md\` link opens that note in Margin.
- A wikilink to a note that does not exist [creates the note](find-and-create.md#create-a-note) at the top of your notes folder.
- A linked image follows its link, and a reference link follows its definition.

Press ⌘[ to go back to the note you came from.

## Preview a linked note

In the editor, hold ⌘ and rest the pointer on a link to another note. In the preview, rest the pointer on the link for a moment. A popover shows the linked note, or the section a heading link names, and scrolls on its own.

Move the pointer into the popover to keep it open. Move away, let go of ⌘, click or press Esc to close it. Click the link itself to open the note.

## Embed a note

Write \`![[Plan]]\` on a line of its own to show the whole note Plan in the preview, or \`![[Plan#Budget]]\` to show one section. The embed sits in a box under an Embedded label and the source's name. Click the name to open the note. The embed updates when you edit its source.

An embed among other words stays a link. A note cannot embed itself, and an embed inside an embedded note stays a link, so no note draws itself in a loop.

## See which notes link here

When other notes link to the open note, the [footer](window-tour.md#the-footer) says so, such as "3 notes link here". Click it to list those notes. Use the arrow keys and Return, or click, to open one. Press Esc to close the list.

## Find unlinked mentions

The footer also counts notes that name the open note without linking to it, such as "2 notes mention this". The list shows them under Unlinked mentions, each with how many times it names the note.

A mention is the note's title as whole words, ignoring case and accents. So \`Plan\` counts in "plan" and "PLAN" but not in "planning". Margin does not count the title in front matter, code or an existing link.

## Link the mentions in a note

In the footer's list, click the Link button beside a note under Unlinked mentions. Margin makes each mention in that note a wikilink and keeps the sentence reading as before. A mention written "plan" becomes \`[[Plan|plan]]\`. Margin takes a [snapshot](safety.md#snapshots) of the note first, then says, for example, "Linked 2 mentions of Plan in Draft".

## Fix broken links

1. Press ⇧⌘P and choose Note Health.
2. Margin saves the note and lists, with their lines, links that lead nowhere: a note no link can find, a file or image that is not in the notes folder, and a heading the linked note does not have.
3. Click a row to go to its line, or use its buttons:
   - Create Note makes and opens a missing note.
   - Remove Link keeps the link's text, or removes an image or an embed.
   - Restore brings back [a missing file](images.md#restore-a-missing-attachment) from a backup, when one holds it.

The list updates as you edit. A note with no problems shows "No broken links or missing images." Press Esc or click Done to close it. Margin does not check web links, since it [does not go online](privacy.md#when-margin-goes-online) to test them.

## Rename a heading without breaking links

To rename a heading and update every link that points at it, see [Outline, headings and sections](outline-and-sections.md#rename-a-heading).

## See also

- [Outline, headings and sections](outline-and-sections.md), to rename headings and move sections without breaking links
- [Rename, delete and organize notes](manage-notes.md), to rename or merge notes with their links updated
- [Tags, properties and bases](properties-and-bases.md), to group notes by tag and property
`,ie=`---
title: Lists and tasks
section: Writing
order: 3
summary: Continue, nest and renumber lists as you type, and check off tasks in the editor or the preview.
---

# Lists and tasks

Margin continues lists as you type and keeps numbered lists in order when you move items around. Tasks are list items with a checkbox, \`- [ ]\` and \`- [x]\`, which you can check off with a click.

## Start a list

Type \`- \` or \`1. \` at the start of a line, or use a key:

| Keys | Makes |
| --- | --- |
| ⇧⌘8 | A bullet list |
| ⇧⌘7 | A numbered list |
| ⇧⌘T | A task list |

The keys act on every selected line. Press the same key again to take the list off.

## Continue a list

Press Return at the end of an item to start the next one. Return continues bullet lists, numbered lists, task lists and block quotes. A new task starts unchecked.

To end a list, press Return on an empty item. If the empty item is nested, Return moves it out one level instead.

In a quote, Return on an empty quote line keeps the quote, so a quote can hold several paragraphs. A second Return ends it.

## Nest and unnest items

- Press Tab to nest an item, with the items under it, beneath the item above.
- Press ⇧Tab to move an item out one level. The items that followed it nest under it.

Both keys renumber the numbered lists the item leaves and joins. A list numbered 1. 1. 1. keeps those numbers. Tab leaves a list's first item where it is, and each press is one step of undo.

To indent lines that are not list items, see [Write and edit](editor.md#indent-several-lines).

## Remove a list mark

Put the caret at the start of an item's text and press Delete. The list mark goes and the text stays, in one step of undo.

## Check off a task

Do any of these:

- Click the task's checkbox in the editor. The caret stays where it was.
- Put the caret on the task's line and press ⇧⌘L.
- Click the checkbox in the [preview](preview.md#click-in-the-preview).

A checked task's text turns grey. Each change is one step of undo. A right-click or Control-click on a checkbox opens the menu and leaves the task as it was. In a [read-only note](safety.md#notes-you-can-read-but-not-edit), the preview's checkboxes do nothing.

## Paste into a list

When you [paste](formatting.md#paste-formatted-text) several lines into a list item, Margin continues the list.

- Each pasted line becomes an item with the list's marker and indent, and an empty checkbox in a task list.
- A pasted list keeps its nesting and its own checkboxes, and takes your list's marker.
- In a numbered list, the pasted items number on from the item the caret is in, and the items after them renumber.
- Blank lines drop out.
- Pasted code, a heading, a quote or a table row stays one block, indented under the item.

One ⌘Z takes the whole paste back. A single plain line pastes as it is.

## Find open tasks in every note

To see every unchecked task in your notes in one list, with due dates and owners, see [Open tasks across notes](tasks.md).

## See also

- [Open tasks across notes](tasks.md), to list every open task with its due date and owner
- [Write and edit](editor.md), to move a list item with ⌃⇧⌘↑ and ⌃⇧⌘↓
- [Slash menu, snippets and templates](slash-menu.md), to insert a list or a task by name
- [Short forms](slash-menu.md#type-a-short-form), to put in three tasks with \`;task3\` and Tab
`,ae=`---
title: Rename, delete and organize notes
section: Notes
order: 2
summary: Rename and delete notes, pin the ones you use most, scope the list to a folder, and merge notes.
---

# Rename, delete and organize notes

Margin's note list is your folder of Markdown files, newest first. Rename a note and Margin renames its file and offers to fix the [links](links.md) to it. Delete a note and it goes to the Trash, where you can get it back.

## Rename a note

1. Select the note and press ⌘R. You can also double-click it in the list, or click its title in the [editor header](window-tour.md#the-editor-header).
2. The title appears in the search field. Edit it and press Return. Press Esc to keep the old name.

When other notes link to the old title, Margin says how many links will change and asks before it changes any of them. Updated links keep what they had:

- A wikilink keeps its heading, its alias and its embed mark.
- A relative \`.md\` link keeps its folder, its fragment and its encoding.
- A link inside code stays as written.

The new name follows the same rules as a new note's. See [Find and create notes](find-and-create.md#create-a-note).

## Move a note to the Trash

1. Select the note in the list.
2. Press ⌘⌫ while the list or the search field has the keys.

The file goes to the macOS Trash. A notice reads \`Moved "Title" to Trash\` with an Undo button for 8 seconds. ⌘Z in the list also brings the note back.

You can also choose Move to Trash from the note menu (⋯) or from a row's right-click menu. In the editor, ⌘⌫ keeps its text meaning and deletes to the start of the line. With no row selected in the list, ⌘⌫ does nothing.

## Pin a note to the top

Select a note and press ⌥⌘P, or choose Pin Note from the note menu (⋯) or the row's right-click menu. The note moves to a Pinned section at the top of the list and shows a pin beside its time. Press ⌥⌘P again to unpin it.

Pins change nothing in the note's file. Margin keeps them in its own [Application Support folder](privacy.md#where-margin-keeps-its-files), and a pin follows a note you rename or move inside Margin. Pins do not change the order of search results.

## Browse notes by date

With the search field empty, the list shows every note, newest first, in sections: Pinned, Today, Yesterday, Previous 7 Days, Previous 30 Days, each earlier month of this year, and each earlier year. A search shows one list in ranked order with no sections.

## Scope the list to a folder

The folder menu sits above the list and reads All Notes until you choose a folder.

1. Click the folder menu.
2. Choose a folder. The list and search now cover that folder and the folders inside it.

New notes go into the folder you chose. Choose All Notes to see every note again. The All Notes item shows the path of your [notes folder](notes-folder.md), and the menu ends with Show Notes Folder in Finder. Saved searches also appear in this menu. See [Tags, properties and bases](properties-and-bases.md#use-a-base-as-a-saved-search).

## Show the folder column

Press ⌃⌘S to show a column of folders to the left of the note list. It holds All Notes and each folder that holds a note, nested under its parent, with a disclosure triangle to open and close each one. Click a folder to scope the list to it, the same as the folder menu. Press ⌃⌘S again to hide the column. Margin remembers whether it shows.

## Show or hide the note list

Press ⌘\\ to hide the list and give the editor the whole panel. Press it again to bring the list back.

## Use a row's menu

Right-click or Control-click a row in the list for these commands, which act on that row and not on the open note:

- Pin Note
- Rename…
- Reveal in Finder
- Copy Wikilink
- Move to Trash

Copy Wikilink copies \`[[Title]]\`, or \`[[folder/Title]]\` when another note has the same title.

## Show a note in Finder

Press ⇧⌘R, or choose Reveal in Finder from the note menu (⋯). Finder opens with the note's file selected.

## Go back and forward

Press ⌘[ to go back to the note you had open before, and ⌘] to go forward again. Margin remembers the notes you opened since it started.

## Merge a note into another

In Margin 0.1.7 and later, Merge Note Into… adds the open note's text to the end of another note, moves the open note to the Trash, and points every link at the note that remains.

1. Open the note you want to merge away.
2. Press ⇧⌘P and choose Merge Note Into….
3. Choose the note to merge into.
4. Read the sheet, such as "Merge Harbour into Plan". It says how many links in how many notes will change. Click Merge.

The chosen note gets its own text, a blank line, and then the open note's text. Margin opens it, and [tabs](tabs-and-layouts.md), the reference pane and Back now lead to it. Each link to the merged note, in any note, now points at the chosen note and keeps its heading, alias and embed mark. Margin takes a [snapshot](safety.md#snapshots) before it writes.

If either note opens read-only, could not be read, or changed on disk meanwhile, Margin leaves both notes as they were and says why.

To split a section out into a note of its own, see [Outline, headings and sections](outline-and-sections.md#move-a-section-to-a-new-note).

## See also

- [Find and create notes](find-and-create.md), to search the list and make new notes
- [Links and wikilinks](links.md), to see which notes link to a note and fix broken links
- [Outline, headings and sections](outline-and-sections.md), to split a section into a note of its own
- [How Margin keeps your notes safe](safety.md), for snapshots, backups and edits from other apps
`,oe=`---
title: Set up your notes folder
section: Get started
order: 2
summary: Choose the folder Margin reads, decide which files it lists, and set where pasted images go.
---

# Set up your notes folder

Every note in Margin is a plain Markdown file in one folder you choose. Margin reads and writes those files in place and keeps no database of its own, so Obsidian, git, iCloud Drive and any other editor keep working on the same files.

## Choose a folder on first run

The first time you open the panel, Margin asks for a notes folder inside the panel.

1. Accept the suggested folder, \`~/Documents/Margin\`, or choose another one.
2. Confirm. Margin creates the folder if it does not exist.

An empty folder shows "No notes yet" with three hints: the panel hotkey, ⌘/ for every shortcut, and ⌘, for [Settings](settings.md#notes-folder-and-files). Margin writes no welcome note. Type a title in the search field and press Return to make your first note.

## Change the folder

1. Press ⌘, to open Settings.
2. Next to Notes folder, click Choose… and pick a folder.

Click Show in Finder beside it to open the folder. You can also open it from the status item's menu with Open Notes Folder in Finder, or from the end of the [folder menu](manage-notes.md#scope-the-list-to-a-folder) above the note list with Show Notes Folder in Finder.

To sync notes between Macs, choose a folder that a sync service already syncs, such as one in iCloud Drive. Margin has no sync service of its own.

## Which files Margin lists

Margin lists \`.md\`, \`.markdown\` and \`.base\` files, including those in subfolders. A note in a subfolder shows its folder path in the list.

To list more kinds of file, open Settings and turn on any of the extra extensions: \`.mdx\`, \`.rmd\`, \`.qmd\` and \`.txt\`.

Margin passes over:

- Hidden folders, including \`.git\`, \`.obsidian\` and \`.trash\`.
- \`node_modules\` folders.
- The attachments folder.

A note's file name is its title. The note "Groceries" is the file \`Groceries.md\`.

## Set the attachments folder

Margin saves [pasted and dropped images](images.md#add-an-image), and the originals of [imported documents](import.md), in an attachments folder. The default is \`attachments/\` at the top of the notes folder.

To change it, open Settings and type a new name under Attachments folder name. Margin refuses a name that a folder of notes already has, because the list leaves the attachments folder's files out.

## Files Margin keeps in the .margin folder

Some features read settings from a hidden \`.margin\` folder inside your notes folder. Because these files live with your notes, they travel with them when you sync or copy the folder. Each file is optional.

| File or folder | What it holds |
| --- | --- |
| \`.margin/ai.md\` | Audience, terms and style for every AI run. See [AI in a note](ai.md#set-rules-for-a-folder). |
| \`.margin/ai.json\` | Folders and notes kept out of AI and away from agents. |
| \`.margin/commands/\` | Your saved AI commands. |
| \`.margin/authorship/\` | The record of AI text you accepted. Margin writes it. |
| \`.margin/templates/\` | Your note templates. See [Slash menu, snippets and templates](slash-menu.md#add-your-own-templates). |
| \`.margin/snippets.json\` | Your snippets. |
| \`.margin/schema.json\` | Naming conventions and column groups for SQL. Open Schema Settings in the command palette opens it, and writes it with the defaults when it is missing. See [SQL schema blocks](schema-blocks.md#set-naming-conventions-and-column-groups). |
| \`.margin/themes/\` | Your editor themes, one CSS file each. See [Themes and writing comfort](appearance.md#make-your-own-theme). |
| \`.margin/export/\` | Your export templates, one CSS file each. See [Export, print and share](export.md#use-an-export-template). |
| \`.margin/frontmatter.json\` | Which JSON Schema checks which notes' front matter. See [Check a note](checks.md#check-front-matter-against-a-schema). |
| \`.margin/plugins/\` | Plugins, one folder each. See [Plugins, macros and hooks](plugins.md). |
| \`.margin/macros/\` | Recorded macros. |
| \`.margin/hooks.json\` | Commands to run when a note saves or opens. |

Margin keeps everything else, such as pins, layouts, snapshots and backups, in \`~/Library/Application Support/Margin/\`, outside your notes. See [Privacy and network use](privacy.md#where-margin-keeps-its-files).

## See also

- [How Margin keeps your notes safe](safety.md), for how Margin saves the folder's files and backs them up
- [Find and create notes](find-and-create.md), to search the folder and add notes to it
- [Open and close the panel](panel.md), to open the panel from any app with its hotkey
`,se=`---
title: Outline, headings and sections
section: Organize
order: 3
summary: Jump to any heading, fold and move sections, and rename or split sections without breaking links.
---

# Outline, headings and sections

A section is a heading and everything under it, down to the next heading of the same level or higher. Margin lets you jump between sections, fold them, move them and split them into notes of their own, and keeps [links](links.md) pointing at the right place as you do.

## Open the outline

1. Press ⇧⌘O. The outline opens above the editor, with each heading indented by its level and its word count under it, such as "312 words".
2. Type to filter the headings.
3. Use the arrow keys to choose a heading, and press Return, or click it.

The caret goes to the end of the heading. Press Esc to close the outline and leave the caret where it was.

A section's word count includes the sections under it.

## Fold a section

| Keys | What they do |
| --- | --- |
| ⌥⌘[ | Fold the section the caret is in |
| ⌥⌘] | Open the fold on the caret's line |

You can also point at a heading and click the toggle in the left margin. A folded section shows "…" after its heading. Click it to open the section. To open every fold, press ⇧⌘P and choose Unfold all sections.

Folds are never written to the file. Margin remembers them for the 20 notes you opened most recently, so switching away and back keeps them.

## Move a section

Press ⌥⌘↑ or ⌥⌘↓ to move the caret's section, with the headings inside it, above or below the next section of the same level. The blank lines between sections stay put, and the move is one step of undo.

To move any block, not only a section, see [Write and edit](editor.md#move-a-block).

## Promote or demote a section

Press ⇧⌘P and choose Promote Section or Demote Section. Margin moves the caret's heading, and every heading under it, one level up or down, in one step of undo.

A level 1 heading cannot be promoted, and a section with a level 6 heading in it cannot be demoted. Margin says why in a notice. Above the first heading, it says "Put the caret under a heading first."

## Rename a heading

1. Put the caret on the heading.
2. Press ⇧⌘P and choose Rename heading….
3. Type the new heading. The sheet says how many links in how many notes point at it.
4. Click Rename and Update Links, or Rename Only. When no link points at the heading, click Rename.

Margin updates \`[[Note#Heading]]\` links, keeping an alias and an embed mark, \`[[#Heading]]\` links in the note itself, and Markdown links whose fragment names the heading. It takes a snapshot of each other note before changing it. One ⌘Z undoes the change in the open note.

A heading that holds \`|\`, \`[\` or \`]\` cannot appear in a wikilink, so Margin renames it without updating links and says so.

## Move a section to a new note

1. Put the caret in the section.
2. Press ⇧⌘P and choose Move Section to New Note….
3. Read the sheet. It says how many links in how many notes point into the section. Click Move and Update Links, Move Only, or Cancel.

Margin makes a new note named for the section's heading, in the same folder, with the heading raised to level 1. In the old note, a wikilink to the new note takes the section's place. Move and Update Links points each link at the moved headings to the new note. One ⌘Z undoes the change in the open note.

If the caret is not under a heading, Margin says "Put the caret in a section under a heading to move it."

## Add a table of contents

In the MultiMarkdown and All [flavors](flavors.md#what-each-flavor-reads), write \`[TOC]\`, \`[[_TOC_]]\` or \`{{TOC}}\` on a line of its own. The [preview](preview.md) draws a table of contents of the note's headings there.

## Restore or export one section

- To bring back an earlier version of a section, see [How Margin keeps your notes safe](safety.md#restore-a-section-from-a-snapshot).
- To export a section on its own, see [Export, print and share](export.md#export-one-section).

## See also

- [Write and edit](editor.md), to move any block and follow the heading path in the footer
- [Rename, delete and organize notes](manage-notes.md), to merge a whole note into another
- [Find and create notes](find-and-create.md), to search headings across every note with \`#\`
`,ce=`---
title: Open and close the panel
section: Get started
order: 3
summary: Open Margin from the menu bar or a hotkey, pin it open, resize it, and fill the screen with it.
---

# Open and close the panel

Margin's window is a panel that drops down from the menu bar. It opens over whatever app you are in, on every Space and over full-screen apps, and gets out of the way when you click elsewhere.

## Open the panel

- Click the Margin icon in the menu bar. The panel opens under the icon, on the display whose menu bar you clicked.
- Press ⌃⌥N in any app. The panel opens on the screen that holds the pointer.
- Click Margin's icon in the Dock, in Margin 0.1.6 and later. To keep Margin in the menu bar alone, turn off Show Margin in the Dock in [Settings](settings.md#startup-and-the-panel).

The panel opens with the [search field](find-and-create.md#search-your-notes) ready for typing and the last note you had open on show. Margin also comes to the front, so [dictation, the emoji picker and Writing Tools](editor.md#type-in-any-language) work in the panel.

## Change the global shortcut

1. Press ⌘, to open [Settings](settings.md#startup-and-the-panel).
2. Click the Global hotkey recorder and press the chord you want.

The hints in an empty notes folder show the new chord from then on.

## Close the panel

Do any of these:

- Press Esc.
- Press ⌘W.
- Click anywhere outside the panel.
- Press the global shortcut, or click the menu bar icon, again.

When you close the panel, Margin saves the open note and returns you to the app you were in.

Esc closes whatever sits on top first. It clears text in the search field, then closes the [find bar](find-and-replace.md#find-text-in-a-note), the [outline](outline-and-sections.md#open-the-outline), the \`[[\` completion list or the shortcut sheet, ends a [snippet's fields](slash-menu.md#fill-in-a-snippets-fields), and removes the marks Find References left. Once nothing is left to close, Esc closes the panel.

## Keep the panel open

Press ⌃⌘P, or click the pin glyph at the right end of the search field. The glyph fills in while the panel is pinned.

A pinned panel stays open when you click in other apps. Esc, ⌘W, the global shortcut or the menu bar icon still close it. Press ⌃⌘P again to unpin.

## Resize the panel

Drag either bottom corner of the panel. Margin remembers the size for next time.

You can also change the size without dragging. Open the command palette with ⇧⌘P and choose one of these:

| Command | What it does |
| --- | --- |
| Larger Panel | Makes the panel 80 points wider and taller |
| Smaller Panel | Makes the panel 80 points narrower and shorter |
| Default Panel Size | Sets the panel to 760 by 540 points |

The panel is never smaller than 480 by 360 points or larger than its screen. It keeps its top edge and its center as it grows and shrinks.

## Fill the screen

Press ⇧⌘F, ⌃⌘F or Globe-F, or choose Enter Full Screen from the note menu (⋯) in the editor header. The panel fills its screen, and the text fills the width, with no line width limit. Press the same keys again, or choose Exit Full Screen, to put the panel back.

When you close a full-screen panel, it opens next time at the size it had before.

## Use the status item's menu

Right-click the Margin icon in the menu bar to see these commands:

- New Note
- Open Notes Folder in Finder
- Browse Snapshots…
- Browse Backups…
- Back Up Now
- Settings…
- Launch at Login
- Quit Margin

See [How Margin keeps your notes safe](safety.md) for snapshots and backups.

## Start Margin at login

Choose Launch at Login in the status item's menu, or turn it on in Settings. Margin turns it on once, the first time you open it from the Applications folder.

## Quit Margin

Press ⌘Q while the panel is open, or choose Quit Margin from the status item's menu. Margin finishes saving the open note before it quits.

## Good to know

- The panel opens on every Space and over apps in full screen.
- The panel sits on the system's glass material and follows the system's [light or dark appearance](appearance.md).
- It fades in over 0.15 seconds and out over 0.12 seconds with a short slide. The [format bar](formatting.md#use-the-format-bar), the slash menu and the empty folder's hints fade in too. Turn on Reduce Motion in System Settings to skip every fade.
- Margin's release builds must meet a set of speed budgets. The panel shows within 50 ms of a click, Margin is ready within 600 ms of launch, a 10 MB note opens in 300 ms, and search answers within 10 ms a keystroke across 5,000 notes.
- Margin has no menu bar of its own while you work. Every menu command is in the command palette, ⇧⌘P. See [A tour of the window](window-tour.md#the-command-palette).

## See also

- [A tour of the window](window-tour.md), for the parts of the panel and the command palette
- [Keyboard shortcuts](keyboard-shortcuts.md), for every key, and how to change one
- [Tabs, layouts and the reference note](tabs-and-layouts.md), to save the panel's size and columns as a layout
- [Troubleshooting](troubleshooting.md), when the panel will not close or Launch at Login stays off
`,le=`---
title: Plugins, macros and hooks
section: Plugins, macros and hooks
order: 1
summary: Add commands with sandboxed plugins, record a series of commands as a macro, and run commands when notes save or open.
---

# Plugins, macros and hooks

Plugins add commands, [slash menu](slash-menu.md) rows and block types written in JavaScript. Macros replay a series of commands you recorded. Hooks run a command each time a note saves or opens. All three live in your [notes folder's](notes-folder.md#files-margin-keeps-in-the-margin-folder) \`.margin\` folder.

## Add a plugin

1. Put the plugin's folder in \`.margin/plugins/\` in your notes folder, such as \`.margin/plugins/word-tools/\`.
2. Press ⌘, and find Plugins in [Settings](settings.md#plugins). The plugin is listed there.
3. Turn the plugin on.

Every plugin is off until you turn it on. Margin keeps which plugins are on in its own Application Support folder, for each notes folder, and never in the notes folder itself. So a notes folder copied from someone else runs nothing until you turn its plugins on.

A plugin's folder holds a \`manifest.json\` that names its version, its main JavaScript file, and the commands, slash rows and block languages it adds. A plugin's folder name uses lowercase letters, digits and hyphens.

## Use a plugin

- A plugin's commands appear in the [palette](window-tour.md#the-command-palette) under Plugins, each with the plugin's name after it, such as "Title Case (word-tools)". A command sends the selection, or the whole note when nothing is selected, and its answer replaces what it was sent.
- A plugin's slash rows appear in the slash menu under Plugins. A row sends the line before the slash, and its answer takes the slash's place.
- A plugin can draw a fenced block of its own language in the [preview](preview.md). Exports show the block as code.

Each answer is one step of undo. If the note changed before the answer came back, or the note is read-only, Margin changes nothing and says so.

## What a plugin cannot do

Margin runs each plugin in a sandbox with no network, no images and no storage. A plugin sees the note's text only when you run one of its commands, and its drawings in the preview pass through the [same safety filter](privacy.md#notes-never-run-code) as any note.

If a plugin does not answer within 2 seconds, Margin stops it and starts it again, so a plugin stuck in a loop cannot freeze the editor.

Settings lists a plugin it cannot turn on with the reason. That happens when its manifest does not read, its version is not three numbers, its main file is not a \`.js\` file inside its own folder, or it claims a block Margin draws itself: \`mermaid\`, \`sql\`, \`math\`, \`calc\` or \`base\`.

## Record a macro

1. Press ⇧⌘P and choose Record Macro.
2. Run the commands you want to record, from the palette or by their keys.
3. Press ⇧⌘P and choose Stop Recording.
4. Type a name for the macro and save it.

The macro appears in the palette under Macros. Run it to replay its commands in order, as one step of undo. If a command does nothing, the macro stops there and says which.

Margin saves each macro as \`.margin/macros/<name>.json\`. A name cannot be empty, hold \`/\` or \`:\`, start with a dot, start or end with a space, or run past 64 characters, and must not be in use already. Plugin commands and [AI commands](ai.md#run-an-ai-command) return before their answer arrives, so Record Macro leaves them out and says so.

## Run a command when a note saves or opens

Put a \`.margin/hooks.json\` file in your notes folder, naming a command for each hook by its id:

\`\`\`json
{"save": "editor.formatDocument", "open": "editor.foldSection"}
\`\`\`

- The save hook runs on the note before every save, as a step of undo of its own. This example [tidies the note](editor.md#tidy-a-note) each time it saves.
- The open hook runs on each note as it opens. It cannot change the note's text, so opening a note never writes it.

A hook can name a command from the palette, a plugin's command or a macro. AI commands, Record Macro, and a macro that holds a plugin's or AI command cannot be hooks. Command ids are listed in [Keyboard shortcuts](keyboard-shortcuts.md).

If a hook fails, Margin leaves the note as it was and says why, once, until the file changes.

## See also

- [Keyboard shortcuts](keyboard-shortcuts.md), for the command ids a hook or a key binding names
- [Slash menu, snippets and templates](slash-menu.md), for snippets and templates, which need no code
- [Troubleshooting](troubleshooting.md), when a plugin stops answering
`,ue=`---
title: Read the preview
section: Reading and sharing
order: 1
summary: Show the rendered note beside or instead of its source, with math, diagrams, numbered figures and slides.
---

# Read the preview

The preview shows the note as it reads when rendered, in the note's flavor. It updates as you type, and keeps its scroll position, images and diagrams in place while you do.

## Switch between the editor and the preview

| Keys | Mode |
| --- | --- |
| ⌘1 | Editor |
| ⌘2 | Editor and Preview, side by side |
| ⌘3 | Preview |

You can also click the Editor, Split and Preview buttons in the [editor header](window-tour.md#the-editor-header). In a panel narrower than 900 points, split mode puts the preview under the editor.

Switching modes keeps your caret, your selection, your [folded sections](outline-and-sections.md#fold-a-section) and your place in the note. If the editor had the keys when you left it, it has them again when it comes back.

## Scroll both panes together

In split mode, the editor and the preview scroll together, line for line. Scroll either one and the other follows.

The preview redraws as you type and leaves its scroll position, images and diagrams where they were.

## Click in the preview

- Click a [task's checkbox](lists-and-tasks.md#check-off-a-task) to check it off in the source. In a read-only note the checkboxes do nothing.
- Click a link to follow it, the same as ⌘-clicking it in the editor. See [Links and wikilinks](links.md#open-a-link).
- Click a \`#heading\` link to scroll the preview to that heading.

The preview never leaves the note. Links to other kinds of files, and addresses Margin does not open, do nothing.

## Jump from the preview to the source

Double-click a word in the preview. Margin puts the caret on that word in the source. In preview mode, the editor comes back to show it.

To go the other way, put the caret in a block, press ⇧⌘P and choose Show in preview. The preview scrolls to that block.

## Write math

Margin renders LaTeX math in every flavor except CommonMark.

- Inline math goes between single dollar signs, \`$x^2$\`, or in \`\\(\` and \`\\)\`.
- Displayed math goes between double dollar signs, \`$$x^2$$\`, in \`\\[\` and \`\\]\`, or in a \` \`\`\`math \` block.

A dollar sign that does not start math stays text, so \`$5 and $10\` reads as prices.

## Draw diagrams

Write a \` \`\`\`mermaid \` block to draw a Mermaid diagram in the GitHub, Obsidian and All flavors. Margin draws every diagram in greys. The slash menu has [diagram templates](slash-menu.md#insert-a-diagram-template) to start from.

A Mermaid block longer than 50,000 characters shows as code, with one line that says why. To save a diagram as an image file, see [Export, print and share](export.md#export-a-diagram).

## Use alerts and callouts

Write an alert or callout to set a passage apart:

- A GitHub alert, \`> [!NOTE]\`, in the GitHub and All flavors.
- An Obsidian callout, \`> [!tip]- Title\`, which can fold, in the Obsidian and All flavors.
- An admonition, \`!!! note "Title"\`, \`??? note\` or \`:::note\`, in the All flavor.

All three draw the same way, with a glyph and a word rather than a colored box, so they read the same in greyscale.

## Number figures, equations and tables

In the Pandoc and All flavors you can label a figure, an equation or a table, and refer to it by number.

| To number | Write |
| --- | --- |
| A figure | \`{#fig:name}\` after an image on its own line, as in \`![alt](pier.png "The pier"){#fig:pier}\` |
| An equation | \`{#eq:name}\` after the closing \`$$\` |
| A table | A caption line before or after the table, as in \`Table: Sizes at the harbour {#tbl:sizes}\` |

Then write \`@fig:pier\`, \`@eq:name\` or \`@tbl:sizes\` where you mention it. The preview shows the reference as a link that reads "Figure 1", "Equation 1" or "Table 1", and the caption starts with the number, such as "Figure 1: The pier". Figures, equations and tables each count from 1. A reference to a label that does not exist stays as you wrote it, so the slip shows.

Exports carry the same numbers.

## Read other Markdown extensions

Depending on the flavor, the preview also draws task lists, wikilinks, embeds, [tags](properties-and-bases.md#add-tags), \`%%comments%%\`, a \`[TOC]\` table of contents, footnotes, front matter, \`==highlight==\`, \`^superscript^\`, subscript, definition lists and abbreviations. See [Markdown flavors](flavors.md#what-each-flavor-reads) for which flavor reads what.

## Present a note as slides

1. Separate your slides with a line that holds only \`---\`, \`***\` or \`___\`.
2. Press ⇧⌘P and choose Start Presentation.

The slides fill the panel, starting at the slide that holds the caret. Each slide renders as the preview does, with its pictures and math, and shows its number in the corner.

| Keys | What they do |
| --- | --- |
| →, Space or Page Down | Next slide |
| ←, ⇧Space or Page Up | Previous slide |
| Home, End | First or last slide |
| Esc | Leave the presentation |

You can also click the close button at the panel's top right. The editor gets the keys back with its caret and scroll as they were. To start a slide at each heading too, add \`headingDivider: 2\` to the front matter, with the heading level you want from 1 to 6.

Front matter starts no slide, and Margin skips empty slides. A note with nothing to show says "This note has nothing to present."

## Good to know

- The preview [never runs scripts](privacy.md#notes-never-run-code) from a note. Margin strips scripts and other active content before anything reaches the screen.
- The preview shows images from your notes folder. A path that climbs out of the notes folder does not load.
- The preview follows the system's [light or dark appearance](appearance.md).

## See also

- [Markdown flavors](flavors.md), for which flavor reads which extension
- [Export, print and share](export.md), to save or print what the preview shows
- [Math in notes](calc.md), to work out sums with an answer beside each line
- [Tabs, layouts and the reference note](tabs-and-layouts.md), to keep a rendered reference note beside your draft
`,de=`---
title: Privacy and network use
section: Reference
order: 3
summary: See when Margin reaches the network, what it sends, and where it keeps its files on your Mac.
---

# Privacy and network use

Margin works offline. Your notes stay in your [notes folder](notes-folder.md), and Margin has no account and no server of its own. It reaches the network only for the things on this page, and only after you turn them on.

## When Margin goes online

| What | When | Where it connects |
| --- | --- | --- |
| Claude | You choose Claude in the AI settings, add your key and send a run | Anthropic's API |
| [Database connections](databases.md) | You add a connection and run a command against it | The database server you named |
| [Remote images](images.md#show-images-from-the-web) | Load remote images is on, which it is at first, and a note shows an image from a web address | That image's address |
| Updates | Check for updates once a day is on, which it is at first, in Margin 0.1.6 and later. It asks for a short list of versions and nothing about you or your notes. | The list beside this guide, and GitHub for the download when you install one |
| Links you open | You click or ⌘-click a web link | Your default browser opens it |

Everything else stays on your Mac:

- Margin bundles its [currency rates](calc.md#convert-currencies) and never fetches rates while it runs.
- Margin 0.1.5 and earlier never check for updates. Homebrew does that when you run \`brew upgrade\`.
- Note Health does not test web links.
- AI on this Mac, and [Find by meaning](ai-across-notes.md#search-by-meaning), run on your Mac.
- [Coding agents](agents.md) connect through a file on your Mac that exists only while Agents is on. Margin opens no network port.
- [Plugins](plugins.md#what-a-plugin-cannot-do) run with no network access, and export templates and themes cannot load web fonts or style sheets.

## What Claude receives

With Claude on, a run sends the text it works on, \`.margin/ai.md\` if your folder has one, and any notes the command reads, such as a checklist for Check Against…. Before sending more than a selection, Margin shows the scope, the word count and an estimated cost, and waits for you to click Send.

Margin never sends:

- A note kept out of AI by \`.margin/ai.json\` or \`ai: false\`.
- A passage between \`<!-- margin:protect -->\` and \`<!-- /margin:protect -->\`. It goes as a placeholder.

The AI log records the time, provider, model, scope, tokens and cost of each run, never the text. See [AI in a note](ai.md).

## Notes never run code

The preview and every export strip scripts and other active content from a note before showing it. A note can never run a script, open a frame, or send a form.

## Where Margin keeps its files

Besides your notes, their attachments and the \`.margin\` folder, Margin keeps its own files in \`~/Library/Application Support/Margin/\`:

| File or folder | What it holds |
| --- | --- |
| \`Snapshots/\` | [Earlier versions of each note](safety.md#snapshots), for 7 days |
| \`Backups/\` | Hourly backups of your notes folder |
| \`pins.json\` | Pinned notes |
| \`layouts.json\` | Saved layouts |
| \`keybindings.json\` | Your custom shortcuts |
| \`connections.json\` | Database connections, without passwords |
| \`ai-log.jsonl\` | The AI log |
| \`Semantic/\` | What Find by meaning learned about each section |
| \`agent.sock\` | The connection for coding agents, only while Agents is on |

Passwords for database connections and your Claude key live in the macOS Keychain.

To remove everything Margin keeps outside your notes, see [Install Margin](install.md#uninstall-margin).

## See also

- [AI in a note](ai.md), to turn AI on and keep notes and passages out of it
- [Connect a coding agent](agents.md), for what agents can and cannot see
- [How Margin keeps your notes safe](safety.md), for snapshots and backups
`,fe=`---
title: Tags, properties and bases
section: Organize
order: 1
summary: Tag notes, give them properties, filter by both, and see your notes as a table or a board with bases.
---

# Tags, properties and bases

Your notes are a database already. A note's properties are the keys in its front matter, and its tags come from its front matter and its text. Margin reads them from every note into its index and keeps no copy of its own, so nothing drifts from your files. A base shows the notes you choose as a table or a board, and every edit you make there writes one key in one note.

## Add tags

Write a tag in a note's text as \`#tag\`, or list tags in its front matter:

\`\`\`yaml
---
tags: [work, work/launch]
---
\`\`\`

A tag can hold others under it with a slash, such as \`#work/launch\`. The Obsidian and All [flavors](flavors.md#what-each-flavor-reads) draw tags in the text.

## Write front matter

Front matter is a block of settings at the very top of a note, between two \`---\` lines, one \`key: value\` per line:

\`\`\`
---
calc: true
status: draft
---
\`\`\`

Nothing may come before the first \`---\`, not even an empty line, and the block needs both lines. One \`---\` on its own is a [rule](formatting.md), not front matter.

In Margin 0.1.6 and later, press ⇧⌘P and choose Add Front Matter. Margin writes both lines at the top of the note and puts the caret between them, or puts it at the end of the front matter the note has. Type a key, a colon, a space and the value.

Margin reads these keys itself:

| Key | What it does |
| --- | --- |
| \`calc: true\` | Works out every line of the note as [math](calc.md#start-a-calculation) |
| \`sql: postgresql 16\` | Sets the dialect of the note's [SQL blocks](schema-blocks.md#choose-the-dialect) |
| \`connection: staging\` | Names the [database](databases.md) the note's SQL runs against |
| \`flavor: github\` | Sets the [Markdown flavor](flavors.md) |
| \`ai: false\` | Keeps the note out of [AI](ai.md) |
| \`tags: [recipes, home]\` | Tags the note |
| \`cover: true\` | Starts a PDF [export](export.md) with a cover page |
| \`$schema: schemas/post.yaml\` | Names the schema [Check Front Matter](checks.md#check-front-matter-against-a-schema) uses |

Any other key, such as \`status: draft\`, is a property of your own, which search, bases and the Properties panel read.

## Edit a note's properties

1. Open the note.
2. Press ⇧⌘P and choose Properties.

The Properties panel shows each front matter key with a control for its type. A change writes that one key, as one step of undo, and leaves every other byte of the file as it was.

## Filter by tag or property

Type these in the [search field](find-and-create.md#search-your-notes):

| Type this | To find notes |
| --- | --- |
| \`tag:work\` or \`tag:#work\` | Tagged work, or with a tag under it such as work/launch |
| \`status:draft\` | Whose \`status\` property is draft |
| \`owner:"Ada Lovelace"\` | Whose \`owner\` property is Ada Lovelace. Quotes keep the spaces. |

A property filter ignores case and accents, and matches any item of a list. It filters only when some note has that property, so text such as \`http://x\` still searches as words. Words beside a filter rank the notes it lets through.

## Show notes as a table with a base

In Margin 0.1.7 and later, press ⇧⌘P and choose Bases Cheat Sheet for every piece of base syntax Margin reads, by where it goes.

A base is a set of filters, columns and views written in YAML, in a subset of Obsidian's Bases syntax. Put it in a \` \`\`\`base \` block in any note, or in a \`.base\` file of its own. Margin draws it as a \`table\` or a \`board\` view over the notes its filters match. A \`.base\` file appears in the [note list](notes-folder.md#which-files-margin-lists) like a note.

Margin keeps the parts of a base it does not read, such as \`formulas\`, \`summaries\` and other view types, exactly as written, and marks them Not supported. A filter it cannot read shows no notes and names the filter, rather than showing every note.

## Edit cells in a table

Click a cell in a base's table and type. Margin writes the change to that one key in that one note's front matter, whether or not the note is open. Each edit is one step of undo, so ⌘Z takes back typing and cell edits in the order you made them, and puts back the other note's exact bytes unless something changed it since.

## Use a board

A board view groups notes into columns by one property, named by \`groupBy\`. Each value gets a column, and notes without the property go in a No status column, named for the property.

To move a card, drag it to another column, or open its ⋯ menu and choose Move. Margin sets the property in that card's note, as one step of undo. Press Esc during a drag to cancel. A card cannot move into the No column, since a move sets a key and never removes one.

## Use a base as a saved search

Each \`.base\` file in your notes folder appears in the [folder menu](manage-notes.md#scope-the-list-to-a-folder) above the note list, under Saved Searches. Choose one to scope the list to the notes its first view matches. The list follows your notes as they change. Choose a folder or All Notes to leave the saved search.

## Rename a tag or property across notes

1. Press ⇧⌘P and choose Rename Tag… or Rename Property….
2. Type the old name and the new one. The sheet counts the notes that will change before anything is written.
3. Confirm.

Rename Tag changes the tag and every tag under it, so \`#work/launch\` becomes \`#job/launch\`, in front matter and in text outside code. Rename Property changes the key's name and keeps its value, and skips a note that already has the new name.

## Set a property on many notes

1. Search, or choose a saved search, so the list shows the notes you want.
2. Press ⇧⌘P and choose Set Property on Listed Notes….
3. Type the property and its value, check the count, and confirm.

## Undo a change across notes

After Rename Tag, Rename Property or Set Property, click Undo in the notice or press ⌘Z to put every note back, except a note changed since.

Each of these commands changes only the one key in each note. Margin holds back a note that [changed on disk](safety.md#when-another-app-changes-a-note) meanwhile, or whose front matter is TOML, and says why.

## Check properties against a schema

To check that notes have the properties they should, see [Check a note](checks.md#check-front-matter-against-a-schema).

## See also

- [Open tasks across notes](tasks.md), to list open tasks with their owners and due dates
- [Find and create notes](find-and-create.md), for every filter the search field takes
- [Check a note](checks.md), to check front matter against a JSON Schema
`,v=`---
title: How Margin keeps your notes safe
section: Notes
order: 4
summary: Learn how Margin saves, handles edits from other apps, and brings notes back from snapshots and backups.
---

# How Margin keeps your notes safe

Margin saves as you type and never writes a file you did not change. It keeps two kinds of history outside your [notes folder](notes-folder.md): a snapshot of each note as you edit it, and an hourly backup of the whole folder.

## How Margin saves

There is no save button. Margin saves the open note 400 ms after you stop typing, and at least every 3 seconds while you keep typing. It also saves before the panel closes, before you switch notes, before the Mac sleeps and before Margin quits.

Opening, reading, scrolling and switching notes never write a file. A note you open and close without an edit stays byte for byte as it was.

## How Margin writes a file

Margin writes the new text to a temporary file in the same folder and then swaps it in, so a note is never left half written. The swap keeps the file's creation date, Finder tags and extended attributes, and iCloud Drive sees every read and write.

Each note keeps its own shape. Margin saves a file in the encoding it had, with the same line endings and the same last line. A file that mixes line endings takes the one it uses most, on your first real edit.

## Notes you can read but not edit

Margin edits UTF-8 files, with or without a byte order mark, and UTF-16 files with one. Any other file opens read-only, with a banner that says why, so Margin never saves a file it could damage. You can still read, search and copy it.

## When another app changes a note

Margin watches the notes folder. When another app changes the note you have open:

- If you have no unsaved changes, the new text appears in place, and your caret and scroll stay where they were.
- If you have unsaved changes, Margin first writes the other app's version beside the note as \`Title (conflict 2026-11-14 0930).md\`, then saves your text to the note. A notice names the conflict copy.

Margin also checks the file on disk before every save, so an edit that lands a moment before a save still gets its conflict copy. A note renamed in Finder stays open under its new name.

## When a note is deleted on disk

If another app deletes the note you have open, its text stays in the editor with a "Deleted on disk" banner. Type anything, and Margin writes the file again. If the file comes back on its own, the banner goes away.

## Notes in iCloud Drive

A note that iCloud has not downloaded to this Mac still shows in the list under its own name. When you open it, Margin asks iCloud for it and shows "Margin is downloading this note from iCloud." The note opens read-only until the file arrives, then shows its text. If iCloud refuses, the banner reads "iCloud would not download this note."

## Snapshots

Each time Margin saves a note, it checks the note's newest snapshot. If that is more than 10 minutes old, Margin copies the version on disk into \`~/Library/Application Support/Margin/Snapshots/\` before writing. Margin keeps snapshots for 7 days, separately for each notes folder.

To see the files, choose Browse Snapshots… from the [status item's menu](panel.md#use-the-status-items-menu). Finder opens the snapshot folder.

## Compare a note with a snapshot

1. Press ⇧⌘P and choose Compare with Snapshot….
2. Choose a snapshot, such as Today 09:15, and press Return.

A panel above the editor shows what changed since then, word by word. Its summary reads something like "1 changed, 1 added, 1 removed, 1 moved", or "No changes since this snapshot".

- Removed words are struck through in grey.
- Added words are underlined in heavier type.
- A [section you moved](outline-and-sections.md#move-a-section) shows "Moved here" where it went, and a line such as "Pricing moved down" where it was.
- Runs of blocks that did not change fold to one line, such as "3 blocks the same".

Click a block to put the caret there. Press Esc, click Done or edit the note to close the panel.

## Restore a section from a snapshot

You can bring back one section and leave the rest of the note as it is.

1. Put the caret in a section under a heading.
2. Press ⇧⌘P and choose Restore Section from Snapshot….
3. Choose a snapshot. Under it, Margin shows that snapshot's version of the section, up to 12 lines.
4. Press Return.

Margin replaces only the caret's section and says, for example, "Restored Light from Today 09:15". Press ⌘Z to undo it. If the snapshot has no section with that heading, the list says "No section Light in this snapshot." If the section has not changed, it says "Same as now."

## Backups

Margin backs up the whole notes folder into \`~/Library/Application Support/Margin/Backups/\`, apart from your folder and from any sync service. It makes the first backup five minutes after it opens the folder, then one each hour when a file has changed.

- Hidden files and folders, such as \`.git\` and \`.obsidian\`, stay out.
- A file that iCloud has not downloaded to this Mac stays out, and the backup records its name.
- On an APFS disk, a backup shares unchanged files with earlier ones, so it takes room only for the files that changed.

Margin keeps the newest backup of each hour for 24 hours, of each day for 14 days, of each week for 26 weeks, and of each month after that.

To back up right now, choose Back Up Now from the status item's menu. Margin says how many files it copied, such as "Backed up 412 files." An hourly backup says nothing unless it fails.

## Restore from a backup

1. Choose Browse Backups… from the status item's menu or the [command palette](window-tour.md#the-command-palette). The list shows each backup by its time and number of files, such as Today 10:30 and 412 files.
2. Choose a backup and press Return. Margin lists that backup's notes, each marked Same as now, Changed since, or No longer in the folder.
3. Choose a note and press Return.

A restore never overwrites anything. A note that is no longer in the folder goes back to its old path. A note that has changed comes back beside the current one, named like \`Plan (backup 2026-11-14 10.30).md\`. Press ⌥↩ on a backup to show its folder in Finder.

To restore a missing image or attachment from a backup, see [Images and attachments](images.md#restore-a-missing-attachment).

## If a save fails

If Margin cannot write a note, a "Could not save" banner shows the reason. Your text stays in the editor, and Margin tries again at the next save. The banner goes away once a save works.

## Good to know

- For history beyond snapshots and backups, use Time Machine or git.
- Moving a note to the Trash is undoable during the session. See [Rename, delete and organize notes](manage-notes.md#move-a-note-to-the-trash).

## See also

- [Troubleshooting](troubleshooting.md), for what each banner means and what to do about it
- [Privacy and network use](privacy.md), for every file Margin keeps in Application Support
- [Install Margin](install.md), to keep or remove snapshots and backups when you uninstall
`,y=`---
title: SQL schema blocks
section: SQL and databases
order: 1
summary: Write a database schema in sql blocks with completion, checks, snippets, diagrams and copies for other databases.
---

# SQL schema blocks

A note's \` \`\`\`sql \` blocks are its schema. Margin reads the tables, columns, keys and indexes they define, checks them as you type, completes names and types, and draws a diagram in the [preview](preview.md). The \`.md\` file stays the source, and Margin never drops a statement it cannot read.

## Write a schema

Type \`/\` and choose SQL block, or open a \` \`\`\`sql \` fence yourself, and write your schema in it. All of a note's SQL blocks make one schema, in note order, so a table in one block can reference a table in another.

Margin reads \`CREATE TABLE\`, \`CREATE INDEX\`, \`ALTER TABLE ... ADD\`, \`CREATE TYPE ... AS ENUM\`, \`DROP\` and \`COMMENT ON\`. It keeps every other statement as written and marks it Not checked.

To start from a template, choose Schema, Data dictionary, Migration plan or Decision record in the slash menu. See [Slash menu, snippets and templates](slash-menu.md#insert-a-template).

## Choose the dialect

Add \`sql:\` to the note's [front matter](properties-and-bases.md#edit-a-notes-properties) with the dialect and version:

\`\`\`yaml
---
sql: postgresql 16
---
\`\`\`

Margin knows PostgreSQL 13 to 17, each with its own types, the version each feature arrived in, and its 63-byte limit on names. \`sql: sqlite\` reads the note as SQLite, which takes any word as a type. [Settings](settings.md#sql) sets the dialect for notes that do not name one. An unknown dialect falls back to the default, and Margin says so.

## See problems as you type

Margin marks problems inside SQL blocks with a dotted underline, a glyph in the margin, and a tooltip that starts with Error, Warning or Note. It flags:

- A table or column that does not exist.
- A foreign key whose type differs from the column it references.
- A name used twice.
- A name longer than the dialect allows.
- A type the dialect does not have.
- A feature newer than the note's version.

Margin stays quiet when the note cannot settle a question. It does not check the columns of a table that an \`ALTER TABLE\` it cannot read has touched, and a note with \`CREATE EXTENSION\` may use any type.

## Complete names, types and options

In a SQL block, the completion list knows your schema:

- After \`REFERENCES\`, it lists your tables with their primary keys, and puts in \`users (id)\`.
- Inside the parentheses after a table, it lists that table's columns with their types.
- After \`PRIMARY KEY (\`, \`FOREIGN KEY (\` and \`UNIQUE (\`, it lists the table's columns so far.
- After a column's name, once you type a letter, it lists your enums and the dialect's types for the note's version.
- After a column's type, it lists the options the column can still take, and after \`ON DELETE\` or \`ON UPDATE\` it lists the actions.
- In \`CREATE INDEX\`, it lists tables after \`ON\`, methods after \`USING\`, and the table's columns.

Nothing is offered where you name something new, such as a new column, or in a comment, a string or a number.

## Look up a table or column

- Point at a table's name to see its columns and types. Point at a column's name to see its type, its default and its keys.
- ⌘-click a name, or press ⇧⌘P and choose Go to Definition, to jump to where it is defined.
- Press ⇧⌘P and choose Find References to mark every place the name is written. A notice counts them, such as "3 uses of users". Press Esc or edit to clear the marks.

## Set naming conventions and column groups

Put a \`.margin/schema.json\` file in your [notes folder](notes-folder.md#files-margin-keeps-in-the-margin-folder) to set how constraint and index names are made, and to define groups of columns a table can take whole. Margin 0.1.5 and later open the file for you. In 0.1.4, open it in any text editor.

1. Press ⇧⌘P to open the [command palette](window-tour.md#the-command-palette).
2. Type "schema settings" and choose Open Schema Settings. A sheet over the panel shows \`.margin/schema.json\` as plain text. When the folder has no file, Margin first writes one with the defaults below.
3. Change a pattern or a group.
4. Click Save. Margin uses the change in your SQL blocks right away. Cancel or Esc leaves the file as it was.

With no file, Margin uses these defaults:

\`\`\`json
{
  "version": 1,
  "naming": {
    "pk": "pk_{table}",
    "fk": "fk_{table}_{column}",
    "unique": "uq_{table}_{column}",
    "index": "idx_{table}_{column}",
    "check": "ck_{table}_{rule}"
  },
  "groups": {
    "audit": [
      "created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
      "updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP"
    ]
  }
}
\`\`\`

A pattern holds letters, digits, underscores and the parts \`{table}\`, \`{column}\` and \`{rule}\`. Each pattern must hold the part that tells two names apart, such as \`{column}\` for a unique constraint. A key you leave out keeps its default. A group's name can be letters, digits and underscores, but not \`table\`, \`pk\`, \`fk\`, \`uq\`, \`check\` or \`idx\`.

If Margin cannot use the file, it keeps every default and says why in a notice, such as "Margin could not use .margin/schema.json. It is not valid JSON."

## Use SQL snippets

In a SQL block, type one of these words and press Tab:

| Type | To put in |
| --- | --- |
| \`table\` | A \`CREATE TABLE\` statement |
| \`pk\` | A primary key constraint |
| \`fk\` | A foreign key constraint, offering your tables and their columns |
| \`uq\` | A unique constraint |
| \`check\` | A check constraint |
| \`idx\` | An index |
| \`audit\`, or any group's name | The group's columns, one to a line |

Each constraint's and index's name follows your naming convention, and fills in as you type the table and column. Press Tab to go from field to field. See [Slash menu, snippets and templates](slash-menu.md#fill-in-a-snippets-fields).

## Write a table in one line

Type an abbreviation on a line of a SQL block and press Tab. It becomes a full \`CREATE TABLE\`. Nothing needs setting up first: every column is typed right in the line.

\`\`\`text
table:users>id:uuid.pk+name:text.required+email:text.unique+team_id:uuid.ref(teams)
\`\`\`

becomes

\`\`\`sql
CREATE TABLE users (
  id uuid,
  name text NOT NULL,
  email text,
  team_id uuid,
  CONSTRAINT pk_users PRIMARY KEY (id),
  CONSTRAINT uq_users_email UNIQUE (email),
  CONSTRAINT fk_users_team_id FOREIGN KEY (team_id) REFERENCES teams
);
\`\`\`

| Part | What it does |
| --- | --- |
| \`table:users>\` | Names the table. \`Table:\` works too, since macOS capitalizes a line's first letter. |
| \`name:type\` | One column, such as \`email:text\` or \`price:numeric(10,2)\` |
| \`+\` | Joins one column to the next |
| \`.pk\` | Makes the column the primary key. On several columns, one key over all of them. |
| \`.required\` | \`NOT NULL\` |
| \`.unique\` | A unique constraint |
| \`.index\` | An index on the column |
| \`.ref(teams)\` or \`.ref(teams.id)\` | A foreign key to that table's primary key, or to that column |

While the caret is in an abbreviation, a preview under the line shows "Tab expands to" and the SQL, or "Cannot expand yet" and what is wrong. After Tab, the table's name is selected, and Tab steps through the names, so a name you type over changes everywhere it appears. One ⌘Z brings the abbreviation back. You can also choose Expand Abbreviation in the palette, and Schema Abbreviations Cheat Sheet lists every form with its SQL.

### Shortcuts for columns you use often (optional)

A name with no type is a shortcut for several columns. Margin comes with one, \`audit\`, which adds \`created_at\` and \`updated_at\` timestamps. These two lines give the same table:

\`\`\`text
table:users>id:uuid.pk+audit
table:users>id:uuid.pk+created_at:timestamp.required+updated_at:timestamp.required
\`\`\`

You never need a shortcut. They exist only to save typing. To save your own, such as \`soft_delete\` for a \`deleted_at\` column, add it under \`"groups"\` in \`.margin/schema.json\`, as [Set naming conventions and column groups](#set-naming-conventions-and-column-groups) shows. If you never touch that file, nothing is missing.

## See the diagram

In the preview, every SQL block that defines a table gets an entity relationship diagram under it, in every flavor. Each table shows its columns, their types and PK, FK and UK marks, with a line for each foreign key. [Exports](export.md#export-a-diagram) and copies carry the diagram.

Click a table in the diagram to jump to where it is defined. A schema too large to draw shows "This schema is too large to draw as a diagram."

## Copy a schema for another database

Press ⇧⌘P and choose Copy as SQLite or Copy as MySQL. Margin writes the note's PostgreSQL schema for the other database and puts it on the clipboard.

- Types the target lacks become ones it has. For SQLite, \`uuid\` and \`jsonb\` become \`TEXT\` and \`boolean\` becomes \`INTEGER\`. For MySQL, \`uuid\` becomes \`CHAR(36)\` and \`jsonb\` becomes \`JSON\`.
- An enum becomes \`ENUM(...)\` in MySQL, and \`TEXT\` with a \`CHECK\` in SQLite.
- What the target cannot hold is left out.

The copy starts with a report, as SQL comments, of each thing Margin changed or left out and the note lines it came from, so the report goes wherever you paste. A notice gives the count.

## Copy as DBML or a data dictionary

Press ⇧⌘P and choose Copy as DBML or Copy as Data Dictionary, for any dialect.

- DBML is for diagram tools. It lists each table, its columns and settings, its indexes and its references.
- A data dictionary is Markdown for people. It has a heading for each table, its comment, and a table with each column's name, type, whether it can be null, its default, its keys and its comment.

Each copy starts with what it left out.

## Rename a table or column across notes

1. Put the caret on a table's or column's name.
2. Press ⇧⌘P and choose Rename Table or Column….
3. Type the new name and press Return.
4. If other notes use the name, a sheet asks \`Rename "users" to "people" in other notes?\` and counts the references. Click Update References, Don't Update or Cancel.

Margin renames the name only where the schema uses it, and leaves prose, strings and inline code alone. It takes a [snapshot](safety.md#snapshots) of each other note first. One ⌘Z undoes the rename in the open note. Margin refuses a name the note already has.

To review a schema for missing keys and indexes, see [Review SQL](schema-review.md).

## See also

- [Review SQL](schema-review.md), to find missing keys, unindexed foreign keys and risky queries
- [Database connections](databases.md), to run a block's SQL against a real database
- [Slash menu, snippets and templates](slash-menu.md), for snippet fields and the schema templates
- [Export, print and share](export.md), to save the diagram as SVG or PNG
`,b=`---
title: Review SQL
section: SQL and databases
order: 2
summary: Find missing keys, unindexed foreign keys, risky queries and slow plans in a note's SQL, and fix them.
---

# Review SQL

Review reads the [SQL in a note](schema-blocks.md) the way a careful reviewer would, and lists what it would raise: a table with no key, a foreign key with no index, an \`UPDATE\` with no \`WHERE\`. Each finding says why it matters, and many come with a fix you can apply in one step.

## Open the Review list

Press ⇧⌘P, type \`review sql\` and choose Review SQL. A list opens above the editor, grouped as Keys, Indexes, Deletes, Types, Names, Queries and Plans.

Each row starts with its severity, as a glyph and a word: × Error, ! Warning or i Note. Under the title is the kind of evidence behind it:

| Evidence | Means |
| --- | --- |
| Structural | Read from the schema itself |
| Inferred | Read from how a query uses the schema |
| Observed | Read from a real query plan or a database |
| Needs context | The note does not say enough to decide |

Choose a row and press Return to select the finding's text in the note. The list updates as you edit, so a finding goes away when you settle it. Press Esc to close the list. A note with nothing to raise says "Review found nothing to raise in this note."

## What Review checks in a schema

- A table with no primary key.
- A unique constraint or index on a column that can be null.
- In PostgreSQL, a foreign key that no index starts with.
- An \`ON DELETE CASCADE\` that reaches more than two tables down.
- Columns with one name and different kinds of type in different tables.
- A constraint or index name that breaks the naming in \`.margin/schema.json\`.

## What Review checks in queries

Review also reads the queries a note keeps beside its schema:

- An \`UPDATE\` or \`DELETE\` with no \`WHERE\`.
- A comparison written \`= NULL\` or \`<> NULL\`, which finds no rows.
- \`NOT IN\` over a subquery whose column can be null.
- \`LIMIT\`, \`OFFSET\` or \`FETCH\` with no \`ORDER BY\`.
- \`SELECT *\`.
- A column a \`WHERE\` or \`ON\` filters on that no index starts with.

When a query reads a table the note does not define, Review says it cannot decide from the note, and guesses nothing.

## Review a pasted query plan

Run \`EXPLAIN (FORMAT JSON)\` in PostgreSQL and paste its output into a \` \`\`\`json \` block in the note. Review finds:

- A step whose real number of rows is ten times its planned number or more, either way.
- A sequential scan with a filter, and how many rows it read to keep how many.
- A sort that spilled to disk, and how much it wrote.

A plan without \`ANALYZE\` holds only what was planned, so only the scan rule can speak about it.

## Tell Review how big tables get

A missing index matters more on a big table. Add the rows you expect to the note's [front matter](properties-and-bases.md#edit-a-notes-properties):

\`\`\`yaml
---
workload:
  orders: 2000000
---
\`\`\`

Above 100,000 rows, a missing index on a foreign key or a filtered column becomes a Warning instead of a Note, and its title ends with the number, such as "and this note expects 2,000,000 rows in orders".

## See why a finding matters

Under the list, the chosen row's actions show as buttons with their keys.

- Explain, ⌥↩, opens the rule's explanation and an example under the row.
- Copy Check, ⇧⌘C, copies a PostgreSQL query that returns a row when the finding holds in a real database. It shows only for findings that have one.

## Apply a fix

Five kinds of finding come with a fix: a foreign key's missing index, a filtered column's missing index, a name that breaks the naming convention, \`= NULL\`, and a \`SELECT *\` over one table the note defines. The chosen row shows the lines before and after the fix.

Press ⌘↩, or click Apply Fix, to make the change in one step of undo. The list stays open on the findings that are left.

## Dismiss a finding

When a finding is fine where it is:

1. Choose it and press ⌘D, or click Dismiss.
2. Type why it is fine, and press Return.

Margin writes a comment above the statement, such as \`-- margin-review: ignore <rule> [<title>] <reason>\`. Because the reason lives in the note, the finding stays dismissed on any Mac. The list's last line counts dismissed findings. Delete the comment, or press ⌘Z, to bring the finding back. A finding in a pasted plan cannot be dismissed, since JSON has no comments.

## Ask a model about a finding

With [AI on](ai.md#turn-on-ai), Review can ask a model too.

- Explain also asks the model about the finding and shows its answer under the rule's own, marked AI. Margin keeps the answer until you edit the note.
- Propose Fix, ⇧⌘↩, closes the list and runs a proposal over the finding's statement, which you accept or reject like any AI change. With Claude, Margin always asks first, however short the statement is.

A statement that holds a protected passage is never sent.

## Read sizes and plans from a database

If the note names a [database connection](databases.md#name-a-connection-in-a-note), Review can read facts from it. Nothing is read until you run one of these commands.

- Read Table Sizes, in the [palette](window-tour.md#the-command-palette) or as Read Sizes, ⌥⌘S, under a finding that depends on size, asks the database how many rows each table holds. Those numbers take the place of the note's \`workload:\`, and the list's last line names where they came from.
- Run Plan asks PostgreSQL for the plan of the statement at the caret, without running it, and adds the plan's findings to Review.
- Run Plan with ANALYZE runs the statement to measure it, so a statement that writes asks first, the same as Run.

The plan never goes into the note. While a read waits, a notice says so. Press Esc to stop it.

## See also

- [SQL schema blocks](schema-blocks.md), to write the schema and set the naming convention Review checks
- [Database connections](databases.md), to connect the database Review reads sizes and plans from
- [Check a note](checks.md), for Margin's other checks of a note
`,x=`---
title: Settings
section: Reference
order: 2
summary: Find every Margin setting, what it does and what it starts as.
---

# Settings

Press ⌘, while the panel is open, or choose Settings… from the [status item's menu](panel.md#use-the-status-items-menu), to open Settings. Switches and checkboxes show their state in neutral colors, and the control with the keys shows a brighter surface instead of a blue ring.

Settings that belong to one notes folder, such as which plugins are on and which note holds your math definitions, stay with that folder. Settings in your notes folder's \`.margin\` folder are listed in [Set up your notes folder](notes-folder.md#files-margin-keeps-in-the-margin-folder).

## Notes folder and files

| Setting | What it does | At first |
| --- | --- | --- |
| Notes folder | The folder Margin reads. Choose… picks another, and Show in Finder opens it. | Chosen on first run |
| Attachments folder name | Where pasted images and imported originals go | \`attachments\` |
| Extra file extensions | Also lists \`.mdx\`, \`.rmd\`, \`.qmd\` or \`.txt\` files | Off |

## Startup and the panel

| Setting | What it does | At first |
| --- | --- | --- |
| Global hotkey | Opens and closes the panel from any app. Click the recorder and press a chord. | ⌃⌥N |
| Launch at login | Starts Margin when you log in | Turned on at first launch from the Applications folder |
| Check for updates once a day | Looks for a new version once a day and shows an Update to button when one is ready. Margin 0.1.6 and later | On |
| Show Margin in the Dock | Gives Margin a Dock icon, which opens the panel, and its menus in the menu bar while it is in front. Off, Margin lives in the menu bar alone. Margin 0.1.6 and later | On |

## Editor

| Setting | What it does | At first |
| --- | --- | --- |
| Default Markdown flavor | The [flavor](flavors.md#set-the-default-flavor) for notes that do not name one | All |
| Text direction | Automatic, Left to right or Right to left | Automatic |
| Theme | Standard, Sepia, or a theme in \`.margin/themes/\` | Standard |
| Font | System, Monospaced or Serif | |
| Size | Text size in points | 15 |
| Hide Markdown syntax | Hides marks away from the caret | On |
| Hide it on the caret's line too | [Edit Without Marks](edit-without-marks.md). Needs Hide Markdown syntax on. | Off |
| Focus Mode | Dims everything but the caret's block | Off |
| Typewriter scrolling | Keeps the caret's line in the middle | Off |
| Line height | 1.2 to 2.0 | 1.6 |
| Paragraph spacing | 0 to 1.5 text sizes | 0 |
| Maximum line width | Caps the text at 40 to 200 characters, centered | Off, then 72 |
| Show line numbers | Numbers each line in the editor | Off |
| Spell check | Checks spelling as you type | On |
| Load remote images | Shows [images from web addresses](images.md#show-images-from-the-web) | On |

See [Themes and writing comfort](appearance.md) and [Write and edit](editor.md).

## Math

| Setting | What it does | At first |
| --- | --- | --- |
| Definitions note | A note whose variables, units and rates apply in every calculation in this notes folder | None |
| Large answers as 1.5M | Shows large answers in short form | |
| Decimal places | 0 to 10, or automatic | |

See [Math in notes](calc.md).

## Export and print

| Setting | What it does | At first |
| --- | --- | --- |
| Header | Text at the top of each PDF and printed page | Empty |
| Footer | Text at the bottom of each PDF and printed page | Empty |
| Start PDFs with a cover page | Gives every PDF a cover | |
| Template | Standard, Serif, or a CSS file in \`.margin/export/\` | Standard |

See [Export, print and share](export.md).

## SQL

Settings holds the default SQL dialect for notes whose front matter does not name one. See [SQL schema blocks](schema-blocks.md#choose-the-dialect).

Naming conventions and column groups for SQL live in \`.margin/schema.json\` in your notes folder, not in Settings. To open that file, choose Open Schema Settings in the [command palette](window-tour.md#the-command-palette). Margin writes the file with the defaults first when it is missing, and uses a saved change right away.

## Shortcuts

The Shortcuts pane lists every command you can bind, by group, with a filter. Click a command's keys to record a new chord. See [Keyboard shortcuts](keyboard-shortcuts.md#change-a-shortcut).

## Menus

The Menus pane arranges two things:

- The format bar's buttons. Show or hide each, move them up and down, or click Restore Defaults. See [Format text](formatting.md#arrange-the-format-bar).
- The note menu (⋯) in the editor header. Show or hide each item, and move it up or down. Click Add Command… to add any palette command to the end of the menu, and Remove to take one you added away. Restore Defaults puts back the first menu. Move to Trash always stays last.

## AI

| Setting | What it does | At first |
| --- | --- | --- |
| AI | Off, On this Mac, or Claude | Off |
| Claude API key | Your Anthropic key, kept in the Keychain | |
| Find by meaning | Lets \`?\` in the search field [search by meaning](ai-across-notes.md#search-by-meaning), on this Mac | Off |

See [AI in a note](ai.md#turn-on-ai).

## Agents

The Agents pane holds the switch that lets coding agents connect, a copy button with the setup for Claude Code, Codex and any MCP client, and the last five things agents did. If Margin cannot open the connection, the pane says so. See [Connect a coding agent](agents.md).

## Databases

The Databases pane lists your database connections. Add, test, edit and remove them, and set each one's environment and whether it allows writes. See [Database connections](databases.md).

## Plugins

Settings lists the plugins in your notes folder's \`.margin/plugins/\`, each with a switch. Every plugin starts off. A plugin that cannot run shows why. See [Plugins, macros and hooks](plugins.md).

## See also

- [Keyboard shortcuts](keyboard-shortcuts.md), for every default key
- [Set up your notes folder](notes-folder.md), for the settings files that live in \`.margin\`
- [Privacy and network use](privacy.md), for where Margin keeps its own files
`,S=`---
title: Slash menu, snippets and templates
section: Writing
order: 9
summary: Insert blocks from the slash menu, type short forms such as ;table3x4, expand your own snippets with Tab, and start notes from templates.
---

# Slash menu, snippets and templates

Type \`/\` to put in a block without remembering its Markdown. Short forms such as \`;table3x4\` put in a table, a list or a block from a few letters and Tab. Snippets put in text you type often, with fields you fill in by pressing Tab. Templates give a new note its starting text.

In Margin 0.1.7 and later, press ⇧⌘P and choose Slash Menu Cheat Sheet for every row and what it puts in.

## Insert a block from the slash menu

1. Type \`/\` at the start of a line, or after a space, in ordinary text.
2. Type to narrow the list, such as \`/tab\` for Table.
3. Press Return. Margin replaces the slash and what you typed with the block, and puts the caret where you type next.

Press Esc to close the menu and keep what you typed. The menu does not open in code, front matter or math.

The menu lists Heading 1, Heading 2, Heading 3, Bullet list, Numbered list, Task, Quote, Code block, Table, Divider, Image, Math block, [Calc block](calc.md#start-a-calculation), SQL block, [Mermaid diagram](preview.md#draw-diagrams) and Callout. Rows with a key show it at the right. Callout and Mermaid diagram appear only in [flavors](flavors.md) that draw them. Under them come diagram templates, then your snippets, then templates, and rows that [plugins](plugins.md#use-a-plugin) add. With AI on, the menu also has a row for the AI commands.

## Insert a diagram template

In a flavor that draws Mermaid diagrams, the slash menu has four diagram templates under Diagrams:

- Flowchart, with a start, a Yes or No decision and a way back.
- Sequence diagram, with two participants, a message and its answer.
- State diagram, with two states between a start and an end.
- Entity relationship diagram, with two tables, their keys and the line between them.

Type \`/diagram\` to list all four with the empty Mermaid block. Each goes in as a working diagram with its names as fields. Type over the first name, press Tab to go to the next, and so on. A name used in more than one place changes everywhere at once.

## Fill in a snippet's fields

Snippets and templates can hold fields, places you fill in.

- The first field is selected when the snippet goes in. Type to replace it.
- Press Tab to go to the next field, and ⇧Tab to go back.
- A field that appears in several places changes in all of them as you type.
- A field with choices opens a list. Press Return to pick one.

The snippet ends at its last stop, or when you press Esc or move the caret out of a field. Press ⌘Z right after Tab to take the whole snippet out and get back the word you typed.

## Type a short form

In Margin 0.1.7 and later, a word that starts with \`;\` puts in a table, a list or a block. Type the short form in ordinary text and press Tab.

| Type | Margin puts in |
| --- | --- |
| \`;table\` | A table of two columns and two rows |
| \`;table3x4\` | A table of 3 columns and 4 rows, up to 12 by 50. \`;table3\` has 3 columns and two rows |
| \`;task\` or \`;task3\` | One open task, or 3, up to 50 |
| \`;ul3\` or \`;ol3\` | A bullet list or a numbered list of 3 items, up to 50 |
| \`;link\` or \`;img\` | A link or an image, with the text selected first and the address next |
| \`;code\` | A code block, with a list of languages |
| \`;callout\` | A [callout](preview.md#use-alerts-and-callouts), with a list of kinds |
| \`;math\` | A math block |
| \`;fm\` | [Front matter](properties-and-bases.md#write-front-matter), on the first line of a note only |
| \`;date\` or \`;time\` | Today's date or the time now |

Tab then steps through the places to fill, as in a snippet. In a table, Tab goes from heading to heading and ends in the first cell, and from there Tab moves from cell to cell. In a list, Tab goes down the items. A short form does nothing after a letter or a digit, or in code, front matter or math. A snippet of yours with the same trigger takes its place.

Press ⇧⌘P and choose Short Forms Cheat Sheet for each short form with the text it puts in.

## Write your own snippets

Put your snippets in \`.margin/snippets.json\` in your [notes folder](notes-folder.md#files-margin-keeps-in-the-margin-folder):

\`\`\`json
{
  "version": 1,
  "snippets": [
    { "name": "Signature", "trigger": "sig", "body": "Best,\\n\${1:Tayler}" }
  ]
}
\`\`\`

| Key | What it holds |
| --- | --- |
| \`name\` | The snippet's name, shown in the slash menu. Required. |
| \`body\` | The text to put in, in the syntax below. Required. |
| \`trigger\` | A word with no spaces. Type it and press Tab to put the snippet in. Optional. |
| \`scope\` | \`"prose"\`, the default, for ordinary text, or \`{"fence": "sql"}\` for a \` \`\`\`sql \` block. Optional. |

A body can hold these:

| Write | To get |
| --- | --- |
| \`$1\` or \`\${1}\` | A field |
| \`\${1:text}\` | A field with default text |
| \`\${1\\|a,b\\|}\` | A field with choices |
| \`$0\` | The last stop |
| \`$TITLE\` | The note's title |
| \`$DATE\` | Today's date, such as 2026-11-12 |
| \`$TIME\` | The time, such as 09:05 |
| \`$CLIPBOARD\` | The clipboard's text |

Write a backslash before \`$\`, \`}\` or another backslash to keep it as text.

Your prose snippets also appear in the slash menu under Snippets. A trigger takes Tab before [list nesting](lists-and-tasks.md#nest-and-unnest-items) does, so pick one that is not a common word, such as \`;sig\`. Margin reads the file again whenever it changes. If it cannot use the file, it keeps the built-in snippets and says why in a notice, such as "Margin could not use .margin/snippets.json. Snippet 2 needs a name."

For the snippets Margin has in SQL blocks, see [SQL schema blocks](schema-blocks.md#use-sql-snippets).

## Insert a template

Margin has nine templates: Meeting notes, Spec, Research, Journal, Article, Schema, Data dictionary, Migration plan and Decision record. In the slash menu they appear under Templates.

Choose one to put its text in at the caret, with variables such as \`$TITLE\` and \`$DATE\` filled in and the first field selected. A template after text on the same line starts on a line of its own.

## Start a note from a template

1. Press ⇧⌘P and choose New Note from Template….
2. Choose a template, such as New Spec. The search field reads "Title for new Spec".
3. Type a title and press Return. With no title, Margin names the note for the template.

Press Esc instead to drop the template, so the next ⌘N [makes a plain note](find-and-create.md#create-a-note). Each template is also a command of its own, such as New Spec, so you can find it by name in the palette or give it a [key in Settings](keyboard-shortcuts.md#change-a-shortcut).

## Add your own templates

Put a Markdown file for each template in \`.margin/templates/\` in your notes folder. The template takes the file's name, and follows the built-in ones in the list. A file with a built-in template's name, such as \`Spec.md\`, replaces that template.

Templates use the same syntax as snippet bodies. Write \`\\$5\` for a price, since \`$5\` is a field.

Margin passes over hidden files, folders, files over 1 MB and files that are not UTF-8 text.

## Draft from a template with AI

With AI on, Draft from Template… pours your rough notes into a template's shape as a proposal. See [AI in a note](ai.md#draft-from-a-template).

## See also

- [Format text](formatting.md), for the keys that make the same blocks
- [SQL schema blocks](schema-blocks.md), for the snippets and one-line abbreviations in a sql block
- [AI in a note](ai.md), to draft a note from a template with AI
`,C=`---
title: Tables
section: Writing
order: 6
summary: Move around Markdown tables with Tab and Return, change rows and columns from the palette, and convert CSV.
---

# Tables

Margin edits Markdown pipe tables as text and gives you the keys and commands to work with them like a spreadsheet. Every command changes only the lines it needs to, and each is one step of undo.

## Move between cells

| Keys | What they do |
| --- | --- |
| Tab | Go to the next cell and select what it holds |
| ⇧Tab | Go to the cell before |
| Return | Go down a row, in the same column |

From a row's last cell, Tab goes to the first cell of the next row. From the table's last cell, Tab adds a row. Return in the last row adds a row too, and Return on an empty last row takes it away and puts the caret on a blank line under the table, the way Return [ends a list](lists-and-tasks.md#continue-a-list).

These keys work in every [flavor](flavors.md#what-each-flavor-reads) except CommonMark, which has no tables.

## Add, delete and move rows and columns

Put the caret in a table, press ⇧⌘P, and choose a command. Every table command has Table in its name, so typing "table" lists them all.

| Command | What it does |
| --- | --- |
| Add Table Row Above, Add Table Row Below | Puts in an empty row |
| Delete Table Row | Removes the caret's row |
| Duplicate Table Row | Copies the row under itself |
| Move Table Row Up, Move Table Row Down | Swaps the row with its neighbor |
| Add Table Column Before, Add Table Column After | Puts in an empty column |
| Delete Table Column | Removes the caret's column |
| Duplicate Table Column | Copies the caret's column |
| Move Table Column Left, Move Table Column Right | Swaps the column with its neighbor |

The header row stays the header. Nothing goes above it, and it cannot be deleted or moved. A table's only column stays.

## Align a column

Put the caret in a column and choose Align Table Column Left, Align Table Column Center or Align Table Column Right. Choose Clear Table Column Alignment to go back to the default. Margin changes only the line of dashes under the header.

## Sort rows

Put the caret in a column and choose Sort Table by Column, Ascending or Sort Table by Column, Descending. Margin sorts the body rows by that column:

- Numbers come first, by value, ignoring currency signs, thousands commas and percent signs.
- Text comes next, with numbers inside it read as numbers, so "item 9" comes before "item 10".
- Empty cells go last either way, and rows that compare equal keep their order.

## Convert CSV to a table

1. Paste comma-separated or tab-separated lines into the note.
2. Select them, or put the caret in them.
3. Press ⇧⌘P and choose Convert CSV or TSV to Table.

The first row becomes the header. If the first line holds a tab, Margin reads tab-separated text. Otherwise it reads CSV, where a field in quotes can hold commas and line breaks. Margin selects the first header cell when it is done.

If the first line has no comma or tab, Margin says "Margin needs a comma or a tab in the first line to make a table."

## Convert a table to CSV

Put the caret in a table and choose Convert Table to CSV. Margin replaces the table with CSV and selects it, so you can press ⌘C to copy it. CSV cannot hold column alignment, so alignment is lost.

## Paste cells from a spreadsheet

Copy cells in Numbers or Excel and paste them into a note. Margin pastes them as a table whose first row is the header. To paste the cells as tab-separated text instead, choose Plain Text from the [menu that appears after the paste](formatting.md#paste-formatted-text).

## Paste a table from a web page

A Markdown table has no merged cells and keeps each cell on one line. When you paste a table that has them, Margin keeps every value in its column:

- A merged cell's text goes in its first row and column, and the cells it covered come out empty.
- Lists, paragraphs and line breaks inside a cell become lines joined with \`<br>\`.

A notice tells you what the table needed HTML for, such as "This table needs HTML to keep its merged cells, so Margin split them."

## Work with wide tables

In the editor, each row of a table stays on one line and the editor scrolls sideways to follow the caret. In the preview, a wide table scrolls sideways in its own box. [Exports and print](export.md) lay tables out on the page as usual.

The editor also lines up each table's columns on screen, so every pipe sits under the one above it. It does this without adding spaces to the file, so the Markdown stays exactly as you typed it.

## Number a table

To give a table a number and a caption, such as "Table 1: Sizes", see [Read the preview](preview.md#number-figures-equations-and-tables).

## Edit a table as a grid

With Edit Without Marks on, a table draws as a grid of cells and the caret moves only between cells. See [Edit Without Marks](edit-without-marks.md#edit-a-table-as-a-grid).

## Good to know

- A line right under a table with no blank line before it is not a row, even though some flavors draw it as one. Table keys and commands leave it alone.
- On the line of dashes, the table keys do what they do outside a table.

## See also

- [Slash menu, snippets and templates](slash-menu.md#type-a-short-form), to put in a table of any size by typing \`;table3x4\` and Tab
- [Tags, properties and bases](properties-and-bases.md), to see notes as a table and edit its cells in place
- [Database connections](databases.md), to put a query's results in a note as a table
- [Edit Without Marks](edit-without-marks.md), to edit a table as a grid of cells
`,w=`---
title: Tabs, layouts and the reference note
section: Organize
order: 4
summary: Open notes in tabs, pin a read-only reference note beside your draft, and save the arrangement as a layout.
---

# Tabs, layouts and the reference note

Tabs keep several notes a keystroke apart. A reference note sits beside the note you are writing so you can read one while you write the other. A layout saves the whole arrangement under a name, so you can come back to it later.

## Open notes in tabs

| Keys | Command |
| --- | --- |
| ⌘T | New Tab |
| ⇧⌘W | Close Tab |
| ⇧⌘] | Next Tab |
| ⇧⌘[ | Previous Tab |

New Tab opens a second tab on the current note. The next note you open fills it. Once two or more notes are open in tabs, a row of tabs appears at the top of the editor. Click a tab to go to it, or click its close button to close it.

Opening a note from the list, a [search](find-and-create.md#search-your-notes), a [link](links.md#open-a-link), [Back or Forward](manage-notes.md#go-back-and-forward) puts it in the current tab, or goes to the tab that already holds it. Close Tab opens the tab before it, and the last tab always stays.

Tabs last until Margin quits. A note you rename keeps its tab under its new name. ⌘W still [closes the panel](panel.md#close-the-panel), not a tab.

## Pin a reference note

1. Press ⇧⌘P and choose Pin Reference Note….
2. Choose a note from the list.

The note appears read-only beside the editor, or under it in a narrow panel, rendered as the [preview](preview.md) renders it. It shows in Editor mode only, so split and preview modes keep their own layout.

The reference note updates when its file changes, follows the note if you rename it, and keeps its scroll position. A link in it opens its note. Click Unpin in its header, or choose Unpin Reference Note in the [palette](window-tour.md#the-command-palette), to close it.

## Save a layout

1. Arrange the panel the way you want it: the tabs, the reference note, the note list and folder column, the mode, and the panel's size.
2. Press ⇧⌘P and choose Save Layout….
3. Type a name and press Return.

Saving under a name you already used replaces that layout.

## Open a layout

1. Press ⇧⌘P and choose Layouts…. Each layout shows its number of tabs and its mode, such as "2 tabs · Editor and Preview".
2. Choose one and press Return.

Margin restores the tabs, with the same tab current, the reference note, the columns, the mode and the panel's size. A note that no longer exists is left out. To delete a layout, choose it and press ⌘⌫.

Margin keeps layouts for each notes folder in its own [Application Support folder](privacy.md#where-margin-keeps-its-files), not in your notes.

## See also

- [Open and close the panel](panel.md), to resize the panel and fill the screen
- [Read the preview](preview.md), for the editor, split and preview modes a layout saves
- [Rename, delete and organize notes](manage-notes.md), to show the folder column and go back and forward
`,T=`---
title: Open tasks across notes
section: Organize
order: 2
summary: List every unchecked task in your notes, filter by owner or by what is overdue, and jump to its line.
---

# Open tasks across notes

Open Tasks gathers every [unchecked task](lists-and-tasks.md#check-off-a-task) from every note into one list, so you can see what is left to do without opening each note. Each row leads back to the line the task came from.

## List your open tasks

Press ⇧⌘P and choose Open Tasks…. The list shows each \`- [ ]\` task that has words, under its note's folder and name, with the heading it sits under. Tasks in [front matter](properties-and-bases.md#edit-a-notes-properties) and [code blocks](code-blocks.md) are left out.

A line under the list counts what it shows, such as "12 open tasks in 4 notes". Margin reads the newest notes first and stops after 500 tasks. When it stops early, the line adds how many older notes it left, such as "and more in 4,788 older notes".

## Go to a task

Choose a task and press Return, or click it. Margin opens the note with the caret at the start of the task's words. If the task moved since the list was made, Margin finds it by its words. If it is no longer open, Margin opens the note at the top and says, for example, "That task is no longer open in Plan."

## Add due dates, priorities and owners

Margin reads the task format of the Obsidian Tasks plugin, and the Dataview form of the same fields.

| Field | Write | Or write |
| --- | --- | --- |
| Due date | \`📅 2026-11-20\` | \`[due:: 2026-11-20]\` |
| Priority | 🔺 highest, ⏫ high, 🔼 medium, 🔽 low, ⏬ lowest | \`[priority:: high]\` |
| Owner | | \`[owner:: Ada]\` |

For example:

\`\`\`markdown
- [ ] Send the budget [due:: 2026-11-20] [priority:: high] [owner:: Ada]
\`\`\`

Each row shows the task's words without the fields, and under them its heading, its due date, its priority and its owner. A date that is not a real day, such as 2026-02-30, stays part of the words.

## Filter tasks

Type in the list's filter:

| Type | To see |
| --- | --- |
| Any words | Tasks whose words hold them |
| \`overdue\` | Tasks due before today |
| \`owner:ada\` | Tasks whose owner starts with ada, in any case |

## Pull tasks out of a meeting note

With AI on, Pull Action Items reads a meeting note and proposes a task list of what people agreed to do, with owners and due dates. See [AI in a note](ai.md#pull-action-items).

## See also

- [Lists and tasks](lists-and-tasks.md), to write tasks and check them off
- [Find and create notes](find-and-create.md), to find notes with open tasks through \`kind:todo\`
- [Tags, properties and bases](properties-and-bases.md), to track notes on a board by a property
- [AI in a note](ai.md), to pull action items out of a meeting note
`,E=`---
title: Troubleshooting
section: Reference
order: 4
summary: Fix common problems with saving, missing notes, shortcuts, images, settings files and agents.
---

# Troubleshooting

Find the message you see, or the problem you have, and follow the steps.

## A banner says "Could not save"

Margin could not write the note, and the banner gives the reason. Your text is safe in the editor, and Margin tries again at the next save.

1. Check that the notes folder still exists and that you can write to it, for example in Finder.
2. Check that the disk has free space.
3. Type a character to make Margin save again.

## A note opens but cannot be edited

Margin opens a note read-only when its encoding is not UTF-8 or UTF-16 with a byte order mark, so it never saves a file it could damage. The banner says why. To edit the note in Margin, save it as UTF-8 in another app.

A note still downloading from iCloud also opens read-only until the file arrives. If the banner says "iCloud would not download this note.", iCloud refused the request. Open the note again later.

## A banner says "Deleted on disk"

Another app or Finder deleted the note while it was open. Its text is still in the editor. Type anything and Margin writes the file again. If you meant to delete it, open another note.

## A file named "conflict" appeared beside a note

Another app changed the note while you had unsaved changes. Margin saved the other app's version as \`Title (conflict 2026-11-14 0930).md\`, then saved your text to the note. Compare the two, keep what you need, and move the conflict copy to the Trash. See [How Margin keeps your notes safe](safety.md#when-another-app-changes-a-note).

## A note is missing from the list

- Check the [folder menu](manage-notes.md#scope-the-list-to-a-folder) above the list. If it shows a folder or a saved search, choose All Notes.
- Check the file's extension. Margin lists \`.md\`, \`.markdown\` and \`.base\` files, and the [extras you turn on in Settings](notes-folder.md#which-files-margin-lists).
- Check the file's folder. Margin skips hidden folders, \`node_modules\` and the attachments folder.

## Margin's icon is not in the menu bar

Press ⌃⌥N, or click Margin's icon in the Dock in Margin 0.1.6 and later. If the panel drops down, Margin is running and macOS is hiding its menu bar icon.

1. Open System Settings, choose Menu Bar, and find Margin under Allow in the Menu Bar. Turn it on.
2. If Margin is not in that list, quit it and open it again. In Activity Monitor, select Margin and click the stop button, then press ⌘Space, type Margin and press Return. Look at the list again.
3. If Margin is on and the icon still does not show, it is behind the notch. On a Mac with a notch, icons that do not fit to the right of the notch go under it. Quit a few other menu bar apps, or choose More Space in System Settings under Displays.
4. If you use Bartender, Ice or another menu bar manager, look in its hidden section.

If ⌃⌥N does nothing, Margin is not running. Open it with ⌘Space as in step 2.

## A shortcut does nothing

- In the editor, macOS's text system keeps some keys for itself, and they keep their macOS meaning. The [Shortcuts pane](settings.md#shortcuts) in Settings says when a key is taken.
- Two commands may share a key. The Shortcuts pane names both.
- If you edited \`keybindings.json\` by hand and it has a mistake, Margin uses the default keys and the Shortcuts pane shows the reason.

See [Keyboard shortcuts](keyboard-shortcuts.md).

## The panel does not close when I click elsewhere

The panel is [pinned](panel.md#keep-the-panel-open). Press ⌃⌘P or click the pin glyph to unpin it.

## Launch at Login did not turn on

macOS may hold the request until you approve it. Open System Settings, go to General and then Login Items, and allow Margin.

## An image shows "Image not found"

- The file is not at the path the link names. Run [Note Health](links.md#fix-broken-links) to list missing images, and click Restore if a backup holds the file. See [Images and attachments](images.md#restore-a-missing-attachment).
- The path climbs out of the notes folder. The preview loads images only from inside it.
- The image is on the web and Load remote images is off in Settings.

## A diagram shows as code

A [Mermaid block](preview.md#draw-diagrams) longer than 50,000 characters shows as code, with a line that says why. Split the diagram into smaller ones. A note's [schema diagram](schema-blocks.md#see-the-diagram) past 150 tables shows "This schema is too large to draw as a diagram."

## A search says "Invalid pattern" or "Pattern took too long"

A term between slashes is a regular expression. Invalid pattern means it does not compile. Pattern took too long means it ran longer than one second. Fix the pattern, or remove the slashes to search for the words. See [Find and create notes](find-and-create.md#search-with-a-pattern).

## A notice says Margin could not use a .margin file

Margin names the file and the fault, such as "Margin could not use .margin/snippets.json. Snippet 2 needs a name." Until you fix it:

- A bad \`.margin/snippets.json\` leaves only the built-in snippets.
- A bad \`.margin/schema.json\` keeps the default naming and column groups. Choose Open Schema Settings in the palette to open the file and fix it.
- A bad \`.margin/ai.json\` pauses AI for the folder, since it may be what keeps a note out.

Margin reads each file again as soon as you save it.

## Saved layouts or custom shortcuts disappeared

Margin keeps both in its [Application Support folder](privacy.md#where-margin-keeps-its-files).

- If Margin cannot read \`layouts.json\`, it moves the file aside as \`layouts.json.bad\`.
- If \`keybindings.json\` has a mistake, Margin uses the default keys. Before Settings writes a new file, it moves the old one aside as \`keybindings.json.bad\`.

Open the \`.bad\` file to recover your work by hand.

## An agent cannot reach Margin

- Turn on Agents in Settings. The \`margin\` command says so when it is off.
- If the Agents pane says the connection could not open, quit and reopen Margin.
- Check that the note the agent wants is not kept out of AI. Such notes answer as missing.

See [Connect a coding agent](agents.md).

## A plugin stopped working

If a plugin does not answer within 2 seconds, Margin restarts it. If Settings lists the plugin with a reason, fix its manifest. See [Plugins, macros and hooks](plugins.md).

## Switching notes folders failed

If the open note does not finish closing within 2 seconds, Margin keeps the current folder and says so. Try again.

## See also

- [How Margin keeps your notes safe](safety.md), for how saving, conflict copies and backups work
- [Set up your notes folder](notes-folder.md), for which files Margin lists and the \`.margin\` files it reads
- [Settings](settings.md), for every setting and its default
`,D=`---
title: A tour of the window
section: Get started
order: 4
summary: Learn the parts of the panel, from the search field and note list to the editor header, footer and palette.
---

# A tour of the window

The panel has a search field across the top, the note list on the left, and the editor on the right. Everything else, such as the [outline](outline-and-sections.md#open-the-outline), the [find bar](find-and-replace.md#find-text-in-a-note) and the command palette, opens over or above the editor and closes with Esc.

## The search field

The search field runs across the top of the panel and reads "Search or create a note". Type in it to filter the list. When the field holds text, its right end shows what Return will do, Open or Create. The pin glyph at the far right [keeps the panel open](panel.md#keep-the-panel-open). See [Find and create notes](find-and-create.md).

Press ⌘L from anywhere in the panel to go back to the search field.

## The note list

Each row in the list shows a note's title, the time it last changed, and two lines from its text. A note in a subfolder starts those lines with its folder path. With the search field empty, the list falls into date sections, with pinned notes first. See [Rename, delete and organize notes](manage-notes.md).

The list's footer counts the notes, such as "7 notes", or "3 of 120 notes" while you search. The button at its right makes a new note.

- Press ⌘\\ to show or hide the list.
- Press ⌃⌘S to show the folder column beside it.
- When the list has the keys, start typing. The letters go into the search field, so you never lose a search to the list's own type-select.

## The editor header

A bar above the editor shows the open note's folder and title. Click the title to rename the note.

On the right are three buttons for the editor's modes, Editor, Split and Preview, which match ⌘1, ⌘2 and ⌘3. Each button's tooltip shows its name and keys. See [Read the preview](preview.md).

The ⋯ button opens the note menu, which acts on the open note: Pin Note, Rename…, Reveal in Finder, Copy as HTML, Share…, [Export…](export.md#export-a-note), Print…, Enter Full Screen and Move to Trash. You can add other commands to it and hide the ones you never use. See [Settings](settings.md#menus).

Banners about the open note, such as a [read-only note](safety.md#notes-you-can-read-but-not-edit) or a save that failed, sit under the header.

## Tabs

When you open two or more notes in tabs, a row of tabs appears at the top of the editor. See [Tabs, layouts and the reference note](tabs-and-layouts.md).

## The footer

The editor's footer shows:

- The heading path, the headings the caret sits under. Click one to go to it.
- The word count, character count and reading time, for the note or for the selection.
- How many notes link to this one, or mention it. Click to list them. See [Links and wikilinks](links.md#see-which-notes-link-here).
- In a calculation, the total of its answers. See [Math in notes](calc.md#add-up-totals).
- When a [coding agent](agents.md#review-what-an-agent-proposes) has proposed edits, how many wait for you.

## The command palette

Margin has no menu bar of its own while you work, so every command lives in the command palette.

1. Press ⇧⌘P.
2. Type part of a command's name. The palette ignores case and accents, and lists a title that matches exactly first, then titles that start with what you typed, then the rest.
3. Use ↑ and ↓ to choose a command, and press Return to run it.

Each row shows the command's keys, if it has any. Press Esc to close the palette and go back to where you were.

## The shortcut sheet

Press ⌘/ to see every key Margin binds, grouped as Note, View, Window, Edit, Search field, Format, Blocks, Lists, Links, Find and Margin. On a full-screen panel the groups spread into three columns. Press Esc or ⌘/ again, click Done, or click outside the sheet to close it. See [Keyboard shortcuts](keyboard-shortcuts.md).

## Notices

Margin tells you what it did, or why it could not, in a short notice. A notice stays for 6 seconds. A notice with an Undo button, such as the one after you move a note to the Trash, stays for 8.

## Use Margin with the keyboard and VoiceOver

You can do everything in Margin from the keyboard.

- The control with the keys shows a brighter neutral surface, never a colored ring.
- The caret's line stays above the footer, the chosen row in a list stays in view, and a find match stays below the find bar.
- Every control has a VoiceOver label.
- Text meets the WCAG 2.2 AA contrast ratio of 4.5 to 1, and every button, tab and menu item in the editor is at least 24 by 24 pixels.

To move a block without dragging, see [Write and edit](editor.md#drag-a-block).

## See also

- [Open and close the panel](panel.md), to open, pin, resize and fill the screen with the panel
- [Write and edit](editor.md), for typing, selecting and moving text in the editor
- [Keyboard shortcuts](keyboard-shortcuts.md), for every key the shortcut sheet lists, and how to change one
`,O=[`Get started`,`Notes`,`Writing`,`Reading and sharing`,`Organize`,`Math in notes`,`AI`,`Coding agents`,`SQL and databases`,`Plugins, macros and hooks`,`Reference`];function k(e,t){let n=/^---\n([\s\S]*?)\n---\n?/.exec(t);if(!n)throw Error(`${e} has no front matter`);let r=new Map;for(let e of(n[1]??``).split(`
`)){let t=e.indexOf(`:`);t>0&&r.set(e.slice(0,t).trim(),e.slice(t+1).trim())}return{slug:e,title:r.get(`title`)??e,section:r.get(`section`)??``,order:Number(r.get(`order`)??0),summary:r.get(`summary`)??``,body:t.slice(n[0].length)}}function A(e){let t=e=>{let t=O.indexOf(e);return t<0?O.length:t};return[...new Set(e.map(e=>e.section))].sort((e,n)=>t(e)-t(n)||e.localeCompare(n)).map(t=>({section:t,pages:e.filter(e=>e.section===t).sort((e,t)=>e.order-t.order||e.title.localeCompare(t.title))}))}function j(e){return e.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu,``).trim().replace(/\s+/g,`-`)}function M(e){let t=[],n=``;for(let r of e.split(`
`)){let e=/^(`{3,}|~{3,})/.exec(r);if(e){n?r.startsWith(n)&&(n=``):n=e[1]??``;continue}if(n)continue;let i=/^## +(.+?)\s*#*\s*$/.exec(r);i?.[1]&&t.push({id:j(i[1]),text:i[1]})}return t}function N(e){return e.replace(/^(`{3,}|~{3,}).*$/gm,``).replace(/^\s*\|(.*)\|\s*$/gm,(e,t)=>t.split(`|`).map(e=>e.trim()).filter(Boolean).join(` · `)).replace(/^\s*(?:[-*+]|\d+[.)])\s+/gm,``).replace(/\[([^\]]*)\]\([^)]*\)/g,`$1`).replace(/[*_`>#|]/g,``).replace(/[ \t]+/g,` `)}var P=e=>e.normalize(`NFKD`).replace(/\p{M}/gu,``).toLowerCase();function F(e,t){let n=P(t).split(/\s+/).filter(Boolean);if(n.length===0)return[];let r=[];for(let t of e){let e=N(t.body),i=P(`${t.title}\n${t.summary}\n${e}`);if(!n.every(e=>i.includes(e)))continue;let a=M(t.body),o=n.filter(e=>P(t.title).includes(e)).length*10,s=n.filter(e=>a.some(t=>P(t.text).includes(e))).length*5,c=e.split(`
`).map(e=>e.trim()).filter(Boolean).map((e,t)=>({line:e,at:t,count:n.filter(t=>P(e).includes(t)).length})).filter(({line:e})=>!e.startsWith(`---`)).sort((e,t)=>t.count-e.count||e.at-t.at)[0],l=``;if(c){let t=e.split(`
`).map(e=>e.trim()).filter(Boolean).slice(0,c.at+1);for(let e of t){let t=a.find(t=>t.text===e);t&&(l=t.text)}}let u=n.reduce((t,n)=>t+P(e).split(n).length-1,0);r.push({slug:t.slug,title:t.title,heading:l,snippet:c&&c.count>0?c.line.slice(0,160):t.summary,score:o+s+(c?.count??0),said:u})}return r.sort((e,t)=>t.score-e.score||t.said-e.said||e.title.localeCompare(t.title)).slice(0,20).map(({score:e,said:t,...n})=>n)}function I(e){let[t=``,n=``]=e.replace(/^#\/?/,``).split(`/`);return{slug:decodeURIComponent(t),anchor:decodeURIComponent(n)}}var L=Object.entries(Object.assign({"../../../help/pages/agents.md":n,"../../../help/pages/ai-across-notes.md":r,"../../../help/pages/ai.md":i,"../../../help/pages/appearance.md":a,"../../../help/pages/calc.md":o,"../../../help/pages/checks.md":s,"../../../help/pages/code-blocks.md":c,"../../../help/pages/databases.md":l,"../../../help/pages/edit-without-marks.md":u,"../../../help/pages/editor.md":d,"../../../help/pages/export.md":f,"../../../help/pages/find-and-create.md":p,"../../../help/pages/find-and-replace.md":m,"../../../help/pages/flavors.md":h,"../../../help/pages/formatting.md":ee,"../../../help/pages/images.md":g,"../../../help/pages/import.md":_,"../../../help/pages/install.md":te,"../../../help/pages/keyboard-shortcuts.md":ne,"../../../help/pages/links.md":re,"../../../help/pages/lists-and-tasks.md":ie,"../../../help/pages/manage-notes.md":ae,"../../../help/pages/notes-folder.md":oe,"../../../help/pages/outline-and-sections.md":se,"../../../help/pages/panel.md":ce,"../../../help/pages/plugins.md":le,"../../../help/pages/preview.md":ue,"../../../help/pages/privacy.md":de,"../../../help/pages/properties-and-bases.md":fe,"../../../help/pages/safety.md":v,"../../../help/pages/schema-blocks.md":y,"../../../help/pages/schema-review.md":b,"../../../help/pages/settings.md":x,"../../../help/pages/slash-menu.md":S,"../../../help/pages/tables.md":C,"../../../help/pages/tabs-and-layouts.md":w,"../../../help/pages/tasks.md":T,"../../../help/pages/troubleshooting.md":E,"../../../help/pages/window-tour.md":D})).map(([e,t])=>k(e.replace(/^.*\/|\.md$/g,``),t)),R=A(L),z=R.flatMap(e=>e.pages),B=e(`all`);function V(e,t={},...n){let r=document.createElement(e);for(let[e,n]of Object.entries(t))n!==void 0&&r.setAttribute(e,n);return r.append(...n),r}var H=V(`button`,{class:`help-menu`,type:`button`,"aria-expanded":`false`,"aria-controls":`help-nav`},`Pages`),U=V(`input`,{type:`search`,placeholder:`Search the guide`,"aria-label":`Search Help`,spellcheck:`false`}),W=V(`nav`,{class:`help-nav`,id:`help-nav`,"aria-label":`Pages`}),G=V(`main`,{class:`help-page preview`}),K=V(`aside`,{class:`help-toc`,"aria-label":`On this page`});document.body.append(V(`header`,{class:`help-bar`},H,V(`a`,{class:`help-title`,href:`#/`},`Margin Help`),V(`label`,{class:`help-search`},U,V(`kbd`,{},`/`))),V(`div`,{class:`help-body`},W,V(`div`,{class:`help-main`},G,K)));for(let e of R){let t=V(`ul`);for(let n of e.pages)t.append(V(`li`,{},V(`a`,{href:`#/${n.slug}`,"data-slug":n.slug},n.title)));W.append(V(`h2`,{},e.section),t)}function q(e){document.body.classList.toggle(`help-nav-open`,e),H.setAttribute(`aria-expanded`,String(e))}H.addEventListener(`click`,()=>q(!document.body.classList.contains(`help-nav-open`)));function pe(e){for(let t of e.querySelectorAll(`a[href]`)){let e=t.getAttribute(`href`)??``,n=/^([\w-]+)\.md(?:#([\w-]+))?$/.exec(e);n?t.setAttribute(`href`,`#/${n[1]}${n[2]?`/${n[2]}`:``}`):e.startsWith(`#`)&&t.setAttribute(`href`,`#/${J}/${e.slice(1)}`)}}function me(e){for(let t of[...e.querySelectorAll(`h2`)]){if(!/^(good to know|limits)$/i.test((t.textContent??``).trim()))continue;let e=V(`section`,{class:`help-note`});t.before(e);let n=t;for(;n&&!(n instanceof HTMLHeadingElement&&n.tagName===`H2`&&n!==t);){let t=n.nextSibling;e.append(n),n=t}}}function he(e){for(let t of e.querySelectorAll(`table`)){let e=V(`div`,{class:`help-table`});t.before(e),e.append(t)}}var J=``,Y=[];function X(){if(Y.length===0)return;let e=(document.querySelector(`.help-bar`)?.getBoundingClientRect().bottom??0)+40,t=Y[0];for(let n of Y)n.heading.getBoundingClientRect().top<=e&&(t=n);window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-2&&(t=Y[Y.length-1]);for(let e of Y)e===t?e.link.setAttribute(`aria-current`,`location`):e.link.removeAttribute(`aria-current`)}var Z=!1;window.addEventListener(`scroll`,()=>{Z||(Z=!0,requestAnimationFrame(()=>{Z=!1,X()}))},{passive:!0});function ge(e){let t=e.offsetTop,n=t+e.offsetHeight;(t<W.scrollTop||n>W.scrollTop+W.clientHeight)&&(W.scrollTop=t-W.clientHeight/3)}function _e(e,n){let r=L.find(t=>t.slug===e)??z[0];if(!r)return;J=r.slug,G.innerHTML=t(B.render(r.body)),G.prepend(V(`p`,{class:`help-kicker`},r.section));for(let e of G.querySelectorAll(`h2`))e.id=j(e.textContent??``);me(G),he(G);for(let e of G.querySelectorAll(`ol[start]`))e.style.counterReset=`step ${e.start-1}`;pe(G);let i=z.indexOf(r),a=z[i-1],o=z[i+1],s=V(`nav`,{class:`help-steps`,"aria-label":`Previous and next`});a&&s.append(V(`a`,{href:`#/${a.slug}`,class:`help-previous`},V(`span`,{},`Previous`),a.title)),o&&s.append(V(`a`,{href:`#/${o.slug}`,class:`help-next`},V(`span`,{},`Next`),o.title)),G.append(s),K.replaceChildren(),Y=[];let c=M(r.body);if(c.length>1){let e=V(`ul`);for(let t of c){let n=V(`a`,{href:`#/${r.slug}/${t.id}`},t.text),i=document.getElementById(t.id);i&&Y.push({heading:i,link:n}),e.append(V(`li`,{},n))}K.append(V(`h2`,{},`On this page`),e)}let l;for(let e of W.querySelectorAll(`a[data-slug]`))e.dataset.slug===r.slug?(e.setAttribute(`aria-current`,`page`),l=e):e.removeAttribute(`aria-current`);l&&ge(l),q(!1),document.title=`${r.title} - Margin Help`;let u=n?document.getElementById(n):null;u?u.scrollIntoView():window.scrollTo(0,0),X()}function Q(e){let t=F(L,e);G.replaceChildren(V(`h1`,{},t.length?`Results for "${e.trim()}"`:`No pages hold "${e.trim()}"`));let n=V(`ul`,{class:`help-results`});for(let e of t){let t=e.heading?`/${j(e.heading)}`:``,r=L.find(t=>t.slug===e.slug)?.section??``;n.append(V(`li`,{},V(`p`,{class:`help-hit-section`},r),V(`a`,{href:`#/${e.slug}${t}`},e.title,e.heading?V(`span`,{},` › ${e.heading}`):``),V(`p`,{class:`help-hit-snippet`},e.snippet)))}G.append(n),K.replaceChildren(),Y=[];for(let e of W.querySelectorAll(`a[aria-current]`))e.removeAttribute(`aria-current`);window.scrollTo(0,0)}function $(){let{slug:e,anchor:t}=I(location.hash);U.value=``,_e(e,t)}U.addEventListener(`input`,()=>U.value.trim()?Q(U.value):$()),U.addEventListener(`keydown`,e=>{e.key===`Enter`&&G.querySelector(`.help-results a`)?.click(),e.key===`Escape`&&(U.value=``,$())}),document.addEventListener(`keydown`,e=>{e.key===`/`&&document.activeElement!==U&&(e.preventDefault(),U.focus()),e.key===`Escape`&&q(!1)}),window.addEventListener(`hashchange`,$),$();