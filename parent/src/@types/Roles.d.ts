interface Role {
  id: number;
  name: string;
  created: string;
  modified: string;
  created_by: string | null;
  modified_by: string | null;
}
type RoleMap = Map<number, Role>;
