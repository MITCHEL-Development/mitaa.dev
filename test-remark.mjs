import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const md = "![Example image](/blog-example.png)";
const result = await remark().use(remarkGfm).use(remarkHtml).process(md);
console.log("DEFAULT:", result.toString());

const result2 = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(md);
console.log("UNSANITIZED:", result2.toString());
