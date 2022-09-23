import Link from "../Link";
import { useMemo } from "react";
import { encodeQuerystring } from "../../utils/encode";
import { getTarget } from "../Link/tools";

export function PostBottom(props: {
  type: "overview" | "article" | "about";
  lock: boolean;
  tags?: string[];
  next?: { id: number; title: string };
  pre?: { id: number; title: string };
  openArticleLinksInNewWindow: boolean;
}) {
  const show = useMemo(() => {
    if (props.type == "article" && !props.lock) {
      return true;
    }
    return false;
  }, [props]);
  return show ? (
    <div className="mt-4">
      {props.tags && props.tags.length > 0 && (
        <div className="text-sm  text-gray-500 flex justify-center space-x-2 select-none dark:text-dark">
          {props.tags.map((tag) => (
            <div key={`article-tag-${tag}`}>
              <Link
                href={`/tag/${encodeQuerystring(tag)}`}
                newTab={props.openArticleLinksInNewWindow}
              >
                <a
                  target={getTarget(props.openArticleLinksInNewWindow)}
                  href={`/tag/${encodeQuerystring(tag)}`}
                  className=" border-b border-white hover:border-gray-500 dark:border-dark dark:hover:border-gray-300 dark:hover:text-gray-300"
                >{`${tag}`}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
      <hr className="mt-3 dark:border-hr-dark" />
      <div className="flex justify-between text-sm mt-2 whitespace-nowrap overflow-hidden ">
        <div className="" style={{ maxWidth: "50%" }}>
          {props.pre?.id && (
            <Link
              href={`/post/${props.pre?.id}`}
              newTab={props.openArticleLinksInNewWindow}
            >
              <a
                style={{ whiteSpace: "break-spaces" }}
                href={`/post/${props.pre?.id}`}
                target={getTarget(props.openArticleLinksInNewWindow)}
                className="dark:text-dark dark:border-dark dark-border-hover border-b pb border-dashed hover:border-gray-800 border-white hover:text-gray-800"
              >{`< ${props.pre?.title}`}</a>
            </Link>
          )}
        </div>
        <div className="" style={{ maxWidth: "50%" }}>
          {props.next?.id && (
            <Link
              href={`/post/${props.next?.id}`}
              newTab={props.openArticleLinksInNewWindow}
            >
              <a
                style={{ whiteSpace: "break-spaces" }}
                href={`/post/${props.next?.id}`}
                target={getTarget(props.openArticleLinksInNewWindow)}
                className="dark:text-dark dark:border-dark  dark-border-hover border-b pb border-dashed hover:border-gray-800 border-white hover:text-gray-800"
              >{`${props.next?.title} >`}</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
