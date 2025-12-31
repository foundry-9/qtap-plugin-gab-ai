var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  plugin: () => plugin
});
module.exports = __toCommonJS(index_exports);

// provider.ts
var import_plugin_utils = require("@quilltap/plugin-utils");
var GabAIProvider = class extends import_plugin_utils.OpenAICompatibleProvider {
  constructor() {
    super({
      baseUrl: "https://gab.ai/v1",
      providerName: "GabAI",
      requireApiKey: true,
      attachmentErrorMessage: "Gab AI does not support file attachments"
    });
  }
};

// icon.tsx
var import_react = __toESM(require("react"));
function GabAIIcon({ className = "h-5 w-5" }) {
  return /* @__PURE__ */ import_react.default.createElement(
    "svg",
    {
      className: `text-green-600 ${className}`,
      fill: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "data-testid": "gab-ai-icon"
    },
    /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "11", fill: "none", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ import_react.default.createElement(
      "path",
      {
        d: "M12 2A10 10 0 1 1 2 12A10 10 0 0 1 12 2Z",
        fill: "currentColor",
        opacity: "0.1"
      }
    ),
    /* @__PURE__ */ import_react.default.createElement(
      "text",
      {
        x: "50%",
        y: "50%",
        textAnchor: "middle",
        dominantBaseline: "middle",
        fill: "currentColor",
        fontSize: "9",
        fontWeight: "bold",
        fontFamily: "system-ui, -apple-system, sans-serif"
      },
      "GAB"
    )
  );
}

// index.ts
var import_plugin_utils2 = require("@quilltap/plugin-utils");
var logger = (0, import_plugin_utils2.createPluginLogger)("GabAI");
var metadata = {
  providerName: "GAB_AI",
  displayName: "Gab AI",
  description: "Gab AI language models for chat completions",
  colors: {
    bg: "bg-green-100",
    text: "text-green-800",
    icon: "text-green-600"
  },
  abbreviation: "GAB"
};
var config = {
  requiresApiKey: true,
  requiresBaseUrl: false,
  apiKeyLabel: "Gab AI API Key"
};
var capabilities = {
  chat: true,
  imageGeneration: false,
  embeddings: false,
  webSearch: false
};
var attachmentSupport = {
  supportsAttachments: false,
  supportedMimeTypes: [],
  description: "No attachment support (text only)",
  notes: "Gab AI does not currently support file attachments"
};
var messageFormat = {
  supportsNameField: true,
  supportedRoles: ["user", "assistant"],
  maxNameLength: 64
};
var cheapModels = {
  defaultModel: "gab-01",
  recommendedModels: ["gab-01"]
};
var plugin = {
  metadata,
  config,
  capabilities,
  attachmentSupport,
  // Registry-based configuration properties
  messageFormat,
  charsPerToken: 3.5,
  toolFormat: "openai",
  cheapModels,
  defaultContextWindow: 128e3,
  /**
   * Factory method to create a Gab AI LLM provider instance
   */
  createProvider: (baseUrl) => {
    logger.debug("Creating Gab AI provider instance", { context: "plugin.createProvider", baseUrl });
    return new GabAIProvider();
  },
  /**
   * Get list of available models from Gab AI API
   * Requires a valid API key
   */
  getAvailableModels: async (apiKey, baseUrl) => {
    logger.debug("Fetching available Gab AI models", { context: "plugin.getAvailableModels" });
    try {
      const provider = new GabAIProvider();
      const models = await provider.getAvailableModels(apiKey);
      logger.debug("Successfully fetched Gab AI models", { context: "plugin.getAvailableModels", count: models.length });
      return models;
    } catch (error) {
      logger.error("Failed to fetch Gab AI models", { context: "plugin.getAvailableModels" }, error instanceof Error ? error : void 0);
      return [];
    }
  },
  /**
   * Validate a Gab AI API key
   */
  validateApiKey: async (apiKey, baseUrl) => {
    logger.debug("Validating Gab AI API key", { context: "plugin.validateApiKey" });
    try {
      const provider = new GabAIProvider();
      const isValid = await provider.validateApiKey(apiKey);
      logger.debug("Gab AI API key validation result", { context: "plugin.validateApiKey", isValid });
      return isValid;
    } catch (error) {
      logger.error("Error validating Gab AI API key", { context: "plugin.validateApiKey" }, error instanceof Error ? error : void 0);
      return false;
    }
  },
  /**
   * Get static model information
   * Returns cached information about Gab AI models without needing API calls
   */
  getModelInfo: () => {
    logger.debug("Getting Gab AI model information", { context: "plugin.getModelInfo" });
    return [
      {
        id: "gab-01",
        name: "Gab AI 01",
        contextWindow: 128e3,
        maxOutputTokens: 4096,
        supportsImages: false,
        supportsTools: false
      }
    ];
  },
  /**
   * Render the Gab AI icon
   */
  renderIcon: (props) => {
    logger.debug("Rendering Gab AI icon", { context: "plugin.renderIcon", className: props.className });
    return GabAIIcon(props);
  },
  /**
   * Format tools from OpenAI format to OpenAI format
   * Gab AI uses OpenAI format (inherited from OpenAI-compatible)
   *
   * @param tools Array of tools in OpenAI format
   * @returns Array of tools in OpenAI format
   */
  formatTools: (tools) => {
    logger.debug("Formatting tools for Gab AI provider", {
      context: "plugin.formatTools",
      toolCount: tools.length
    });
    try {
      const formattedTools = [];
      for (const tool of tools) {
        if (!("function" in tool)) {
          logger.warn("Skipping tool with invalid format", {
            context: "plugin.formatTools"
          });
          continue;
        }
        formattedTools.push(tool);
      }
      logger.debug("Successfully formatted tools", {
        context: "plugin.formatTools",
        count: formattedTools.length
      });
      return formattedTools;
    } catch (error) {
      logger.error(
        "Error formatting tools for Gab AI",
        { context: "plugin.formatTools" },
        error instanceof Error ? error : void 0
      );
      return [];
    }
  },
  /**
   * Parse tool calls from Gab AI response format
   * Extracts tool calls from Gab AI API responses (OpenAI format)
   *
   * @param response Gab AI API response object
   * @returns Array of tool call requests
   */
  parseToolCalls: (response) => {
    logger.debug("Parsing tool calls from Gab AI response", {
      context: "plugin.parseToolCalls"
    });
    try {
      const toolCalls = (0, import_plugin_utils2.parseOpenAIToolCalls)(response);
      logger.debug("Successfully parsed tool calls", {
        context: "plugin.parseToolCalls",
        count: toolCalls.length
      });
      return toolCalls;
    } catch (error) {
      logger.error(
        "Error parsing tool calls from Gab AI response",
        { context: "plugin.parseToolCalls" },
        error instanceof Error ? error : void 0
      );
      return [];
    }
  }
};
var index_default = plugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  plugin
});
