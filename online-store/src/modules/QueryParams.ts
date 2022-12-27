class QueryParams {
  constructor(
    public categories: Array<string | undefined> = [],
    public publishers: Array<string | undefined> = [],
    public name: Array<string | undefined> = [],
    public min_price: Array<number | undefined> = [1],
    public max_price: Array<number | undefined> = [1000],
    public min_players: Array<number | undefined> = [1],
    public max_players: Array<number | undefined> = [50],
    public min_playtime: Array<number | undefined> = [5],
    public max_playtime: Array<number | undefined> = [180],
    public order_by: Array<string | undefined> = [],
    public ascending: Array<string | undefined> = [],
    public client_id: Array<string | undefined> = ["XZAmoxZ2qA"]
  ) {}

  delete(field: Array<string | number | undefined>, value: string) {
    const i = field.indexOf(value);
    if (i !== -1) {
      field.splice(i, 1);
    }
  }
}

export default QueryParams;
