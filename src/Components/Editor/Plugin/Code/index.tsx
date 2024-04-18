import { $isCodeNode, getCodeLanguages } from "@lexical/code";
import { $getNodeByKey, LexicalEditor } from "lexical";
import { useCallback, useMemo } from "react";
import {
  FaApple,
  FaAtom,
  FaCss3,
  FaHtml5,
  FaJava,
  FaMarkdown,
  FaMicrophone,
  FaPython,
  FaRss,
  FaRust,
  FaSwift,
} from "react-icons/fa";
import {
  SiC,
  SiCloudera,
  SiCplusplus,
  SiJavascript,
  SiSvg,
  SiTypescript,
} from "react-icons/si";
import { MdOutlineJavascript } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { PiMathOperationsBold } from "react-icons/pi";
import { AiFillFileMarkdown } from "react-icons/ai";
import { IoText } from "react-icons/io5";
import { LuFileText } from "react-icons/lu";
import {
  TbBrandPython,
  TbBrandTypescript,
  TbFileTypeSql,
  TbFileTypeXml,
} from "react-icons/tb";
import { CiText } from "react-icons/ci";
import { Select, SelectItem } from "@nextui-org/react";
// import { ChevronDownIcon } from "./Heading";
const _code = {
  atom: <FaAtom />,
  c: <SiC />,
  clike: <SiCloudera />,
  cpp: <SiCplusplus />,
  css: <FaCss3 />,
  html: <FaHtml5 />,
  java: <FaJava />,
  javascript: <SiJavascript />,
  js: <MdOutlineJavascript />,
  markdown: <FaMarkdown />,
  markup: <FaXmark />,
  mathml: <PiMathOperationsBold />,
  md: <AiFillFileMarkdown />,
  objc: <FaApple />,
  objectivec: <FaApple />,
  plain: <IoText />,
  plaintext: <LuFileText />,
  py: <TbBrandPython />,
  python: <FaPython />,
  rss: <FaRss />,
  rust: <FaRust />,
  sql: <TbFileTypeSql />,
  ssml: <FaMicrophone />,
  svg: <SiSvg />,
  swift: <FaSwift />,
  text: <CiText />,
  ts: <TbBrandTypescript />,
  txt: <LuFileText />,
  typescript: <SiTypescript />,
  xml: <TbFileTypeXml />,
};
function Code({
  selcetd,
  selectedElementKey,
  editor,
}: {
  selcetd: string;
  selectedElementKey: string;
  editor: LexicalEditor;
}) {
  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e: string) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );
  return (
    <Select
      label="Select a Language"
      className="max-w-64 border-2 border-gray-300 rounded-xl"
      variant="bordered"
      onSelectionChange={(e) =>
        onCodeLanguageSelect([...e][0] as (typeof codeLanguges)[0])
      }
      startContent={_code[selcetd as keyof typeof _code]}
      color="primary"
      selectedKeys={[selcetd]}
      size="sm"
    >
      {codeLanguges.map((e) => (
        <SelectItem
          key={e}
          value={e}
          startContent={_code[e as keyof typeof _code]}
        >
          {e}
        </SelectItem>
      ))}
    </Select>
  );
}

export default Code;
