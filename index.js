let katex = require("katex")
let path = require('path')

let cfgs = (function () {
  let cssFile = 'katex/dist/katex.min.css'
  let cssPath = require.resolve(cssFile)
  let filePath = path.dirname(cssPath)
  let cssName = path.basename(cssPath)
  let cssList = []
  cssList.push(cssName)
  return {
    assets: filePath,
	js: [],
    css: cssList
  }
})()

module.exports = {
    book: cfgs,
    ebook: cfgs,
    blocks: {
        math: {
            shortcuts: {
                parsers: ["markdown", "asciidoc", "restructuredtext"],
                start: "$$",
                end: "$$"
            },
            process: function(blk) {
                var tex = blk.body;
                var isInline = !(tex[0] == "\n");
                var output = katex.renderToString(tex, {
                    displayMode: !isInline
                });

                return output;
            }
        }
    }
};
