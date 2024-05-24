import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Todo = ({
  id,
  title,
  description,
  complete,
  mongoId,
  deleteTodo,
  completeTodo,
}: {
  id: number;
  title: string;
  description: string;
  complete: boolean;
  mongoId: string;
  deleteTodo: (mongoId: string) => void;
  completeTodo: (mongoId: string) => void;
}) => {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{id + 1}</TableCell>
        <TableCell className={`${complete && "line-through"}`}>
          {title}
        </TableCell>
        <TableCell className={`${complete && "line-through"}`}>
          {description}
        </TableCell>
        <TableCell className="text-center">
          {complete ? "Completed" : "Pending"}
        </TableCell>
        <TableCell className="text-center flex gap-1">
          <Button variant="destructive" onClick={() => deleteTodo(mongoId)}>
            Delete
          </Button>
          {!complete && (
            <Button variant="success" onClick={() => completeTodo(mongoId)}>
              Done
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default Todo;
