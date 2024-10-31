import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  const { control, watch } = useFormContext();

  const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
        <div>
      <h2 className="text-2xl font-bold">Image</h2>
      <FormDescription>
        Add an image to display on your restaurant listing in search results.
        Uploading a new image will overwrite the existing one.
      </FormDescription>
      </div>

      <div className="flex flex-col gap-8 md:w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio={16/9}>
            <img src={existingImageUrl}
             className="rounded-md object-cover h-full w-full"
             />
          </AspectRatio>
        )}
        <FormField 
        control={control} 
        name="imageFile" 
        render={({field}) => (<FormItem>
            <FormControl>
                <Input 
                className="bg-white" 
                type="file" 
                accept=".jpg, .jepg, .png"
                onChange={(event) => field.onChange(event.target.files ? event.target.files[0]: null)} //only accept the first upload in a time
                />
            </FormControl>
            <FormMessage />
        </FormItem>
        )} 
        />
      </div>
    </div>
    
  );
}

export default ImageSection;