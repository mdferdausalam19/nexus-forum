// discussion section functionality
const discussionContainerCard = async (categoryName) => {
  let discussionCardsResponse = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts`
  );
  if (categoryName) {
    discussionCardsResponse = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`
    );
  }
  const discussionCards = await discussionCardsResponse.json();
  const discussionContainer = document.getElementById("discussion-container");
  discussionContainer.innerHTML = ``;
  discussionCards.posts.forEach((card) => {
    const discussionCard = document.createElement("div");
    discussionCard.classList = `flex flex-col md:flex-row gap-6 rounded-3xl bg-[#F3F3F5] p-7`;
    discussionCard.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6 rounded-3xl bg-[#F3F3F5] p-2">
                        <div>
                            <div class="avatar ${
                              card.isActive === true ? "online" : "offline"
                            }">
                                <div class="w-20 rounded-full">
                                    <img
                                        src="${card.image}" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                class="mb-3 flex flex-col md:flex-row gap-4 text-[rgba(18,19,45,0.80)] text-sm font-medium">
                                <p>#${card.category}</p>
                                <p>Author: ${card.author.name}</p>
                            </div>
                            <div class="mb-5 space-y-3">
                                <h3 class="text-[#12132D] text-xl font-bold" id="discussion-card-title">${
                                  card.title
                                }
                                </h3>
                                <p class="text-[rgba(18,19,45,0.80)]">${
                                  card.description
                                }</p>
                            </div>
                            <div class="border-dashed border-[rgba(18,19,45,0.25)] border-b-2 mb-5"></div>
                            <div class="flex justify-between items-center">
                                <div
                                    class="flex justify-center items-center flex-col md:flex-row space-x-6 text-[rgba(18,19,45,0.80)]">
                                    <div class="flex items-center gap-2">
                                        <img src="images/tabler-icon-message.png" alt="">
                                        <p>${card.comment_count}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <img src="images/tabler-icon-eye.png" alt="">
                                        <p id="discussion-card-view">${
                                          card.view_count
                                        }</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <img src="images/tabler-icon-clock.png" alt="">
                                        <p>${card.posted_time}</p>
                                    </div>
                                </div>
                                <div onclick="markAsRead('${card.title}','${
      card.view_count
    }')">
                                    <a class="hover:cursor-pointer">
                                        <img src="images/email.png" alt="">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
    discussionContainer.appendChild(discussionCard);
  });
};
discussionContainerCard();

// latest posts section functionality
const latestPostsContainerCard = async () => {
  const latestPostsCardsResponse = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const latestPostsCards = await latestPostsCardsResponse.json();
  const latestPostsContainer = document.getElementById(
    "latest-posts-container"
  );
  latestPostsCards.forEach((card) => {
    const latestPostsCardDiv = document.createElement("div");
    latestPostsCardDiv.classList = `card bg-base-100 w-96 shadow-xl`;
    latestPostsCardDiv.innerHTML = `
    <figure class="px-10 pt-10">
                        <img src="${card.cover_image}" alt=""
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-start">
                        <div class="flex items-center gap-3">
                            <img src="images/calender.png" alt="">
                            <p class="text-[rgba(18,19,45,0.60)]">${
                              card.author?.posted_date
                                ? card.author?.posted_date
                                : "No Publish Date"
                            }</p>
                        </div>
                        <h2 class="card-title text-[#12132D] text-lg font-extrabold">${
                          card.title
                        }</h2>
                        <p class="text-[rgba(18,19,45,0.60)]">${
                          card.description
                        }</p>
                        <div class="flex items-center gap-4">
                            <div>
                                <img class="w-20 rounded-full" src="${
                                  card.profile_image
                                }" alt="">
                            </div>
                            <div>
                                <h4 class="text-[#12132D] font-bold">${
                                  card.author.name
                                }</h4>
                                <p class="text-[rgba(18,19,45,0.60)] text-sm">${
                                  card.author?.designation
                                    ? card.author?.designation
                                    : "Unknown"
                                }</p>
                            </div>
                        </div>
                    </div>
    `;
    latestPostsContainer.appendChild(latestPostsCardDiv);
  });
};
latestPostsContainerCard();

// search functionality
const searchInputField = document.getElementById("search-input-field");
function searchPost() {
  const searchInputFieldValue = searchInputField.value;
  if (searchInputFieldValue) {
    discussionContainerCard(searchInputFieldValue);
  } else {
    alert("Please enter a valid category name");
  }
}

// mark as read functionality
let count = 0;
const markCardContainer = document.getElementById("mark-card-container");
function markAsRead(cardTitle, cardViewCount) {
  const markCardDiv = document.createElement("div");
  markCardDiv.classList = `flex items-center justify-between rounded-2xl bg-white p-3`;
  markCardDiv.innerHTML = `
      <div>
          <h3 class="text-[#12132D] font-semibold">${cardTitle}</h3>
      </div>
      <div class="flex items-center gap-1 min-w-[75px]">
          <img src="images/tabler-icon-eye.png" alt="">
          <p>${cardViewCount}</p>
      </div>
      `;
  markCardContainer.appendChild(markCardDiv);
  count++;
  document.getElementById("mark-as-read-count").innerText = count;
}
