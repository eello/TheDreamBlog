// createdAt: "2021-02-19T21:31:52.486Z"
// description: "테스트4"
// id: 6
// link: "http://www.naver.com"
// subject: "테스트4번"
// tags: [{…}]
// thumbnailUrl: "http://www.naver.com"
// updatedAt: "2021-02-19T21:31:52.486Z"
// writer: null

{/* <li><a href="#">#Card</a></li>
            <li><a href="#">#Test</a></li>
            <li><a href="#">#HTML</a></li>
            <li><a href="#">#CSS</a></li> */}

        
function retAlt(index) {
    const ret = index % 2 == 0 ? "" : "alt"
    return ret;
}

function paintPostCard(index,{id, link, subject, tags, thumbnailUrl, updatedAt, writer, description, createdAt}) {
    const card = `<div class="blog-card ` + retAlt(index) + `">
    <div class="meta">
      <div class="photo" style="background-image: url(${thumbnailUrl})"></div>
      <ul class="details">
        <li class="author"><a href="#">${writer}</a></li>
        <li class="date">${updatedAt.split("T")[0]}</li>
        <li class="tags">
          <ul>
          ${tags.map(tag => { return `<li><a href="#">${tag.tag}</a></li>`})}
            
          </ul>
        </li>
      </ul>
    </div>
    <div class="description">
      <h1>${subject}</h1> <!--메인 제목-->
      <p class="description__details">${description}</p> <!--상세 설명 정도-->
      <p class="read-more">
        <a href=${link}>Read More</a>
      </p>
    </div>
  </div>`;

  console.log(card);
  
  const cardContainer = document.querySelector(".card-container");
  cardContainer.insertAdjacentHTML("beforeend", card);
  

}

function getPostList() {
    fetch(`http://101.101.210.243/thedream.api/post`)
    .then((response) => response.json())
    .then((response) => {
      // request 성공 시
      response.map( (res, index) => paintPostCard(index, res));
      console.log(response);
    })
    .catch((err) => console.log(err));
}

function init() {
    getPostList();
}

init()