class QueryParams {
  constructor(
    public params: any = {
      categories: "",
      publishers: "",
      name: "",
      min_price: 1,
      max_price: 1000,
      min_players: 1,
      max_players: 50,
      min_playtime: 5,
      max_playtime: 180,
      order_by: "",
      ascending: "",
      id: "",
    }
  ) {}

  delete(field: Array<string | number | undefined>, value: string) {
    const i = field.indexOf(value);
    if (i !== -1) {
      field.splice(i, 1);
    }
  }
}

export default QueryParams;
