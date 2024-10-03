// fetch and show categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.error(error));
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  for (const item of categories) {
    const button = document.createElement("button");
    button.classList.add("bg-gray-300", "px-3", "py-1", "rounded-md");
    button.innerText = item.category;
    categoriesContainer.append(button);
  }
};

loadCategories();

// fetch and show videos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.error(error));
};
// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  videos.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <figure class="mb-3">
            <img src="${item.thumbnail}" 
            class="rounded-xl w-full h-48 object-cover object-center"/>
        </figure>
        <div class="flex gap-2">
            <figure>
                <img src="${item.authors[0].profile_picture}" 
                class="w-8 h-8 object-cover object-center rounded-full"/>
            </figure>
            <div>
                <h3 class="font-semibold">
                    ${item.title}
                </h3>
                <p class="text-xs">${item.authors[0].profile_name}</p>
                <p class="text-xs">${item.others.views}</p>
            </div>
        </div>`;
    videosContainer.append(div);
  });
};

loadVideos();
