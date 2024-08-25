const discussionContainerCard = async () => {
  const discussionCardsResponse = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const discussionCards = await discussionCardsResponse.json();
  const discussionContainer = document.getElementById("discussion-container");
  discussionCards.posts.forEach((card) => {
    const discussionCard = document.createElement("div");
    discussionCard.classList = `flex flex-col md:flex-row gap-6 rounded-3xl bg-[#F3F3F5] p-7`;
    discussionCard.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6 rounded-3xl bg-[#F3F3F5] p-2">
                        <div>
                            <div class="avatar online">
                                <div class="w-14 rounded-full">
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
                                <h3 class="text-[#12132D] text-xl font-bold">${card.title}
                                </h3>
                                <p class="text-[rgba(18,19,45,0.80)]">${card.description}</p>
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
                                        <p>${card.view_count}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <img src="images/tabler-icon-clock.png" alt="">
                                        <p>${card.posted_time}</p>
                                    </div>
                                </div>
                                <div>
                                    <a href="">
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
