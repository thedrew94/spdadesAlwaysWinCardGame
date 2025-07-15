const activeControllers = new Map();

export async function getFetch({ url = "", params = {}, options = {} }) {
  try {
    // Validate URL
    if (!url) {
      throw new Error("URL is required");
    }

    // Destructure options with defaults
    const { headers = {}, signal = null, timeout = 10000 } = options;

    // Abort any previous request for this specific URL
    if (activeControllers.has(url)) {
      activeControllers.get(url)?.abort();
    }

    // Create a new AbortController for this request
    const requestController = new AbortController();
    activeControllers.set(url, requestController);

    // Build query string from params
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    // // Create a timeout controller
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), timeout);

    // Combine signals if both are provided
    const combinedSignal = signal || requestController.signal || timeoutController.signal;

    // Make the GET request
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      signal: combinedSignal,
      credentials: "include",
    });

    // Clear timeout and remove controller
    clearTimeout(timeoutId);
    activeControllers.delete(url);

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}, URL: ${fullUrl}`);
    }

    // Check Content-Type to ensure JSON
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    // Parse and return JSON data
    const data = await response.json();
    return data;
  } catch (error) {
    // Remove controller on error
    activeControllers.delete(url);

    // Handle errors (e.g., network issues, abort, or HTTP errors)
    if (error.name === "AbortError") {
      throw new Error("Request timed out or was aborted");
    }
    throw error; // Re-throw for ErrorBoundary or component to handle
  }
}
