// fetch categories
const getCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.error(error));
};

// show categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");

  const buttonAll = document.createElement("button");
  buttonAll.classList.add(
    "bg-gray-300",
    "px-3",
    "py-1",
    "rounded-md",
    "btn-category"
  );
  buttonAll.innerText = "All";
  buttonAll.onclick = () => {
    removeBgColor();
    buttonAll.classList.add("bg-red-600", "text-white");
    getVideos();
  };

  categoriesContainer.append(buttonAll);

  for (const item of categories) {
    const button = document.createElement("button");
    button.classList.add(
      "bg-gray-300",
      "px-3",
      "py-1",
      "rounded-md",
      "btn-category"
    );
    button.innerText = item.category;
    button.onclick = () => {
      removeBgColor();
      button.classList.add("bg-red-600", "text-white");
      getCategoryVideos(item.category_id);
    };
    categoriesContainer.append(button);
  }
};

function removeBgColor() {
  const buttons = document.getElementsByClassName("btn-category");
  for (const button of buttons) {
    button.classList.remove("bg-red-600", "text-white");
  }
}

// fetch videos
const getVideos = (searchInput = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchInput}`
  )
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.error(error));
};

// show videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML = "";

  if (videos.length === 0) {
    videosContainer.innerHTML = `
        <div class="md:col-span-2 lg:col-span-4 h-96 flex flex-col justify-center items-center">
            <figure class="mb-5">
                <img src="./assets/no-content.png"/>    
            </figure>
            <p class="tex-3xl font-bold">
                Oops!! Sorry, There is no content here
            </p>
        </div>`;
    return;
  }

  videos.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <figure class="mb-3 relative">
            <img src="${item.thumbnail}" 
            class="rounded-xl w-full h-48 object-cover object-center"/>
            ${
              item.others.posted_date?.length === 0
                ? ""
                : `<span class="absolute bg-black text-white p-1 rounded right-2 bottom-2 text-xs">
                ${item.others.posted_date}
                </span>`
            }
        </figure>
        <div class="flex gap-2">
          <figure>
            <img src="${item.authors[0].profile_picture}" 
              class="w-8 h-8 object-cover object-center rounded-full"/>
          </figure>
          <div class="flex justify-between w-full">    
            <div>
              <h3 class="font-semibold">
                ${item.title}
              </h3>
              <p class="text-xs">
                ${item.authors[0].profile_name}
                ${
                  item.authors[0].verified
                    ? `<img src="./assets/verified.png" id="verified" class="inline w-4"/>`
                    : ""
                }
              </p>
              <p class="text-xs">${item.others.views} views</p>
            </div>       
            <div>
              <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" 
                onclick="getVideoDescription('${item.video_id}')"
                class="btn btn-outline btn-xs"
              >
                Details
              </div>
              <div tabindex="0" id="${item.video_id}"
                class="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 p-2 shadow text-xs"
              >
              </div>
              </div>
            </div>
          </div>
        </div>`;
    videosContainer.append(div);
  });
};

// fetch category videos
const getCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((response) => response.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.error(error));
};

const getVideoDescription = (videoId) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    .then((response) => response.json())
    .then((data) => displayDescription(data.video.description, videoId))
    .catch((error) => console.error(error));
};

const displayDescription = (description, elementId) => {
  const element = document.getElementById(elementId);
  element.innerText = description;
};

document.getElementById("search-input").addEventListener("keyup", (event) => {
  getVideos(event.target.value);
});

// calling fetch functions
getCategories();
getVideos();
