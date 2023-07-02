function showContent(id) {
  const contents = document.getElementsByClassName('content');
  for (let i = 0; i < contents.length; i++) {
    contents[i].style.display = 'none';
  }
  document.getElementById(id).style.display = 'block';
}
