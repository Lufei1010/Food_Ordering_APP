import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import MenuItemInput from "./MenuItemInput";
import { useFieldArray, useFormContext } from "react-hook-form";

const MenuSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });
  return (
    <div className="Space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Menu</h2>
            <FormDescription>
              Create your menu and give each dish a name and a price
            </FormDescription>
        </div>
        <FormField control={control} name="menuItems" render={() => (
            <FormItem className="flex flex-col gap-2">
                {fields.map((_, index) => (
                    <MenuItemInput
                    index={index}
                    removeMenuItem={() => remove(index)}
                    />
                ))}
            </FormItem>
        )} 
        />
        <Button type="button" onClick={() => append({ name: "", price: "" })}>
            Add Dish
        </Button>
    </div>
  )
}

export default MenuSection;