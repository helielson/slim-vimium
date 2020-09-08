chrome.runtime.onInstalled.addListener(function () {
  console.log('Slim Vimium...');
});

function navigateTab(goForward) {
  chrome.tabs.query({ active: true, currentWindow: true }, function ([
    activeTab,
  ]) {
    if (activeTab) {
      const currentTabIndex = activeTab.index;

      chrome.tabs.query({ currentWindow: true }, function (allTabs) {
        const tabsLength = allTabs.length;
        const nextTabIndex = (currentTabIndex + 1) % tabsLength;
        const prevTabIndex =
          (currentTabIndex === 0 ? tabsLength : currentTabIndex) - 1;
        const indexToGo = goForward ? nextTabIndex : prevTabIndex;

        chrome.tabs.query({ index: indexToGo }, function ([nextTab]) {
          if (nextTab) {
            chrome.tabs.update(nextTab.id, { active: true });
          }
        });
      });
    }
  });
}

chrome.commands.onCommand.addListener(function (command) {
  console.log('Command:', command);
  if (command === 'next-tab') {
    navigateTab(true);
  } else if (command === 'previous-tab') {
    navigateTab(false);
  }
});
