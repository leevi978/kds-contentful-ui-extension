let api = null;

async function getEntry() {
  await new Promise(r => setTimeout(r, 500));
  return {
    entity: {
      fields: {
        name: {
          "en-US": "Knowit Developer Summit 2023"
        }
      }
    }
  };
}

const mockItem = {
  window: {
    startAutoResizer: () => {
      console.log("api:startAutoResizer");
    }
  },
  field: {
    getValue: () => {
      return "A value";
    },
    setValue: value => {
      console.log("api:setValue", value);
      return Promise.resolve();
    }
  },
  navigator: {
    openEntry: () => getEntry()
  },
  ids: {
    entry: "12345"
  }
};

const init =
  process.env.NODE_ENV === "development"
    ? callback => {
        const stubApi = {
          ...mockItem
        };
        api = stubApi;
        callback(stubApi);
      }
    : callback => {
        var cfExt = window.contentfulExtension || window.contentfulWidget;
        cfExt.init(function(_api) {
          api = _api;
          callback(_api);
        });
      };

export function initApi(callback) {
  init(callback);
}
