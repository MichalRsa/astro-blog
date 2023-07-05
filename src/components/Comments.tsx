import { type ReactElement, useEffect } from "react";

export const Comments = (): ReactElement => {
  function componentDidMount(): void {
    const scriptTag = document.createElement("script");
    const anchor = document?.getElementById("inject-comments-for-uterances");

    scriptTag.setAttribute("src", "https://utteranc.es/client.js");
    scriptTag.setAttribute("repo", "MichalRsa/michalrosa.dev-comments");
    scriptTag.setAttribute("issue-term", "pathname");
    scriptTag.setAttribute("label", "documentation");
    scriptTag.setAttribute("theme", "github-light");
    scriptTag.setAttribute("crossorigin", "anonymous");
    scriptTag.setAttribute("async", "async");
    if (anchor != null) {
      anchor.appendChild(scriptTag);
    }
  }

  useEffect(() => {
    componentDidMount();
  }, []);

  return <div id="inject-comments-for-uterances" />;
};
