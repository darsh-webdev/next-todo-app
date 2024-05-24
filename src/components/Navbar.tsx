import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <div className="flex py-3 flex-wrap justify-around mt-4 items-center">
      <h1 className="text-lg font-semibold">ToDo App</h1>
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/101712708?v=4" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Navbar;
