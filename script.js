document.addEventListener('DOMContentLoaded', function () {
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');

    let commandHistory = [];
    let historyIndex = -1;

    inputElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            processCommand(inputElement.value);
            inputElement.value = '';
            historyIndex = -1; // Reset history index after submitting a new command
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            navigateHistory('up');
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            navigateHistory('down');
        }
    });

    function processCommand(command) {
        commandHistory.unshift(command);
        executeCommand(command);
    }

    function executeCommand(command) {
        const output = command !== '' ? executeValidCommand(command) : '';
        outputElement.textContent += '> ' + command + '\n' + output + '\n';
        outputElement.scrollTop = outputElement.scrollHeight;
    }

    function executeValidCommand(command) {
        const args = command.split(' ');
        const keyword = args[0].toLowerCase();

        switch (keyword) {
            case 'search':
                return searchCommand(args.slice(1).join(' '));
            case 'goto':
                return gotoCommand(args.slice(1).join(' '));
            case 'echo':
                return echoCommand(args.slice(1).join(' '));
            case 'clear':
                return clearCommand();
            case 'help':
                return generateHelp();
            case 'openab':
                return openAboutBlank(args.slice(1).join(' '));
            case 'ngon run':
                return ngonRun();
            default:
                return 'Error: Invalid command. Type "help" for a list of commands.';
        }
    }

    function searchCommand(query) {
        if (query) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
            return `Searching Google for: ${query}`;
        } else {
            return 'Error: Missing search query. Usage: search "Google search"';
        }
    }

    function gotoCommand(url) {
        if (url) {
            window.open(url, '_blank');
            return `Opening ${url} in a new tab`;
        } else {
            
        }
    }

    function ngonRun() {
        var urlObj = new URL(window.location.href);
        var url = "n-gon-master/index.html";
        if (url) {
            var win;
            if (win) {
                win.focus();
            } else {
                win = window.open();
                win.document.body.style.margin = '0';
                win.document.body.style.height = '100vh';
                var iframe = win.document.createElement('iframe');
                iframe.style.border = 'none';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.margin = '0';
                iframe.src = url;
                win.document.body.appendChild(iframe);
            }
        }
    }

    function echoCommand(text) {
        return text || 'Error: Missing text. syntax: echo <text>';
    }

    function clearCommand() {
        outputElement.textContent = '';
        return '';
    }

    function generateHelp() {
        const commands = [
            { command: 'search', syntax: 'search "<Google search query>"' },
            { command: 'goto', syntax: 'goto <url>' },
            { command: 'echo', syntax: 'echo <text>' },
            { command: 'clear', syntax: 'clear' },
            { command: 'help', syntax: 'help' },
            { command: 'openab', syntax: 'openab <url>' }
        ];

        const helpText = commands.map(cmd => `${cmd.command}: ${cmd.syntax}`).join('\n');
        return helpText;
    }

    function openAboutBlank(url) {
        if (url) {
            const aboutBlankTab = window.open('about:blank', '_blank');
            
            aboutBlankTab.document.body.innerHTML = `<iframe src="${url}" style="width: 100%; height: 100%; border: none;">Loading...</iframe>`
            const style = aboutBlankTab.document.createElement("link");
            style.href = "/path/to.css";
            style.rel = "stylesheet";
            aboutBlankTab.document.head.appendChild(style);

            return `Opening ${url} in an about:blank tab`;
        } else {
            return 'Error: Missing URL. Usage: openab <url>';
        }
    }

    function navigateHistory(direction) {
        if (commandHistory.length === 0) return;

        if (direction === 'up' && historyIndex < commandHistory.length - 1) {
            historyIndex++;
        } else if (direction === 'down' && historyIndex > 0) {
            historyIndex--;
        }

        inputElement.value = historyIndex >= 0 ? commandHistory[historyIndex] : '';
    }
});
