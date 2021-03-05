/** toast Editor 설정 */
const Editor = toastui.Editor;
const editor = new Editor({
  el: document.querySelector("#editor"),
  height: "600px",
  initialEditType: "markdown",
  previewStyle: "vertical",
});

/** 서버에 프로젝트를 등록 */
document.querySelector(".btn-post-create").addEventListener("click", async () => {
  const response = await fetch("http://101.101.210.243/thedream.api/project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      // subject, markdown 필드는 필수
      subject: document.querySelector("#subject").value,
      markdown: editor.getMarkdown(),
    }),
  });

  if (response.ok) {
    console.log("request success!!!");
    location.assign("/client/projectList.html");
  } else console.log("request fail!!!");
});
