/**
 * Wikipedia-corpus-maker
 *
 * Copyright (c) 2014 Axel Etcheverry
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var system = require("system");
var url;

if (system.args.length > 1)
{
    url = system.args[1];
}
else
{
    console.log("usage: " + system.args[0] + " wikipedia_url");
    phantom.exit(2);
}

var page = require("webpage").create();

page.open(url, function(status) {

    if (status !== "success")
    {
        console.log("FAIL to load the address");
    }
    else
    {
        var content = page.evaluate(function() {

            var process_content = function(element, append) {
                var data = "";

                var excludes = ["tocnumber", "mw-editsection", "bandeau-portail", "reference"];

                for (var j = 0; j < excludes.length; j++)
                {
                    if (element.classList.contains(excludes[j]))
                    {
                        return data;
                    }
                }

                for (var i = 0, len = element.childNodes.length; i < len; i++)
                {
                    var node = element.childNodes[i];

                    if (node.nodeType === 3)
                    {
                        if (node.nodeValue.length === 0)
                        {
                            continue;
                        }

                        if (node.nodeValue === "\n" || node.nodeValue === "\r" || node.nodeValue === "\r\n" || node.nodeValue === " \n")
                        {
                            continue;
                        }

                        data += node.nodeValue + "\n";
                    }

                    if (node.childNodes.length > 0)
                    {
                        data += process_content(node, "");
                    }
                }

                return data + append;
            };

            var content = "";

            var tags = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "ul"];
            var i = 0;
            var tags_size = tags.length;

            for (i = 0; i < tags_size; i++)
            {

                var list = document.getElementById("content").querySelectorAll(tags[i]);

                for (var j = 0; j < list.length; j++)
                {
                    content += process_content(list[j], " ");
                }
            }

            return content;
        });

        console.log(content);
    }

    phantom.exit();
});
