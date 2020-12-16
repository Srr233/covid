const forModel = {
  async getAllData(promise) {
    const response = await promise;
    const json = await response.json();
    return json;
  }
};

export { forModel };
