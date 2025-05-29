const btnVoteUp = document.querySelectorAll('.vote-up');
const btnVoteDown = document.querySelectorAll('.vote-down');

const replyButtons = document.querySelectorAll('.btn-reply');
const deleteButtons = document.querySelectorAll('.btn-delete');

const modal = document.querySelector('.modal');

const btnCancel = document.querySelector('.btn-cancel');
const btnTrash = document.querySelector('.btn-trash');
const btnSend = document.querySelector('.btn-send');

let change = false;

btnVoteUp.forEach(voteUp => {
  voteUp.addEventListener('click', increaseVote);
});

btnVoteDown.forEach(voteDown => {
  voteDown.addEventListener('click', decreaseVote);
});

replyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.parentElement.parentElement.parentElement.parentElement;
    const comment = card.lastElementChild;
    const name = card.children[0].children[1].children[0].children[1].innerText;
    
    let textArea = comment.children[1];
    comment.classList.toggle('hidden');

    const cardParent = card.parentElement;
    const subCardParent = card.parentElement.parentElement;
    const replyBtn = comment.lastElementChild;

    replyBtn.addEventListener('click', () => {
      if (!textArea.value) return;
      let subCard = document.createElement('div');
      subCard.className = 'sub-card';
      subCard.innerHTML = `
        <div class="line"></div>
        <div class="card">
          <div class="card-container">
            <div class="vote">
              <button class="vote-up">
                <img src="../images/icon-plus.svg" alt="">
              </button>
              <span>0</span>
              <button class="vote-down">
                <img src="../images/icon-minus.svg" alt="">
              </button>
            </div>
            <!-- Comment -->
            <div>
              <div class="profile">
                <img src="images/avatars/image-juliusomo.png" alt="">
                <p class="name">juliusomo</p>
                <span class="you">you</span>
                <p>just now</p>
              </div>
              <div>
                <p><span class="initial">@${name}</span> ${textArea.value}</p>
              </div>
              <div class="interact-container">
                <button class="btn btn-delete" onclick="showModal()">
                  <img src="images/icon-delete.svg" alt="">
                  <p>Delete</p>
                </button>
                <button class="btn btn-edit" onclick="editComment()">
                  <img src="images/icon-edit.svg" alt="">
                  <p>Edit</p>
                </button>
              </div>
            </div>
          </div>
          <!-- Reply -->
          <div class="reply-section hidden">
            <img src="../images/avatars/image-juliusomo.png" alt="">
            <textarea></textarea>
            <button class="btn-post">Reply</button>
          </div>
        </div>
      `

      if (card.parentNode.classList.contains('row')) {
        cardParent.appendChild(subCard);
      } 
      else if (card.parentNode.classList.contains('sub-card')) {
        subCardParent.appendChild(subCard);
      }
  
      textArea.value = '';
      comment.classList.add('hidden');
    });
  });
});

deleteButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
});

btnCancel.addEventListener('click', () => {
  modal.classList.add('hidden');
});

btnTrash.addEventListener('click', () => {
  const btnDelete = document.querySelector('.btn-delete');
  const card = btnDelete.parentElement.parentElement;

  card.parentElement.parentElement.remove();
  modal.classList.add('hidden');
});

btnSend.addEventListener('click', () => { 
  const newRow = document.createElement('div');
  const textArea = btnSend.previousElementSibling;
  
  if (!textArea.value)  return;
  newRow.className = 'row';
  newRow.innerHTML = `
  <div class="card">
    <div class="card-container">
      <!-- Vote  -->
      <div class="vote">
        <button class="vote-up">
          <img src="images/icon-plus.svg" alt="">
        </button>
        <span>0</span>
        <button class="vote-down">
          <img src="images/icon-minus.svg" alt="">
        </button>
      </div>
      <!-- Comment -->
      <div>
        <div class="profile">
          <img src="images/avatars/image-juliusomo.png" alt="">
          <p class="name">juliusomo</p>
          <span class="you">you</span>
          <p>just now</p>
        </div>
        <div>
          <p>${textArea.value}</p>
        </div>
        <div class="interact-container">
          <button class="btn btn-delete" onclick="showModal()">
            <img src="images/icon-delete.svg" alt="">
            <p>Delete</p>
          </button>
          <button class="btn btn-edit" onclick="editComment()">
            <img src="images/icon-edit.svg" alt="">
            <p>Edit</p>
          </button>
        </div>
      </div>
    </div>
  </div>`

  const btnParent = btnSend.parentElement.parentElement;
  const cardContainer = document.querySelector('main');

  cardContainer.insertBefore(newRow, btnParent);
  textArea.value = '';
});

function increaseVote() {
  if(change)  return;
  const counter = this.nextElementSibling;

  let counterNumber = Number(counter.innerText);
  counterNumber++;
  
  counter.innerText = counterNumber;
  change = true;
};

function decreaseVote() {
  if(!change)  return;

  const counter = this.previousElementSibling;
  let counterNumber = Number(counter.innerText);
  counterNumber--;
  counter.innerText = counterNumber;
  change = false;
};

function showModal() {
  modal.classList.remove('hidden');
};

function editComment() {
  const btnEdit = document.querySelector('.btn-edit');
  const btnDelete = document.querySelector('.btn-delete');
  const content = btnEdit.parentElement.previousElementSibling;
  const textArea = content.firstElementChild.innerText;

  btnEdit.classList.add('hidden');
  btnDelete.classList.add('hidden');

  content.classList.add('edit-section');
  content.innerHTML = `<textarea class="editedComment">${textArea} </textarea>
  <button class="btn-post btn-update">Update</button>`;
  
  const btnUpdate = document.querySelector('.btn-update');
  const newTextArea = document.querySelector('.editedComment');
  btnUpdate.addEventListener('click', () => {
    content.innerHTML = `<p>${newTextArea.value}</p>`;
    content.classList.remove('edit-section');
    
    btnDelete.classList.remove('hidden');
    btnEdit.classList.remove('hidden');
  });
};
