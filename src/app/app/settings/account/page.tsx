'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { INDUSTRIES } from './constants';

const profileFormSchema = z.object({
  'business-name': z.string().min(1).max(50),
  'business-description': z.string().min(1).max(200),
  industry: z.string({
    required_error: "Please select the Business' Industry."
  }),
  style: z.string({
    required_error: "Please select the Business' Style."
  }),
  images: z.instanceof(FileList).optional()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function AccountSettingsPage() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: {
      'business-name': '',
      'business-description': '',
      industry: '',
      style: '',
      images: new DataTransfer().files
    }
  });

  function onSubmit(data: ProfileFormValues) {
    const images = Array.from(data.images || []).map(file => file.name);
    const formData = { ...data, images };

    console.log(`data ${JSON.stringify(formData, null, 2)}`);
    toast('You submitted the following values:', {
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>
            {JSON.stringify(formData, null, 2)}
          </code>
        </pre>
      )
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file =>
        URL.createObjectURL(file)
      );
      setSelectedImages(imageUrls);
      form.setValue('images', files);
    }
  }

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Manage your Business</h3>
        <p className='text-sm text-muted-foreground'>
          This is how others will see you on the site.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='business-name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Name of your Business' {...field} />
                </FormControl>
                <FormDescription>DESCRIPTION</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='business-description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell others a little bit about your business'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormDescription>DESCRIPTION</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='industry'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Business' Industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INDUSTRIES.map(({ label, value }, index: number) => (
                      <SelectItem key={index} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>DESCRIPTION</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='style'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Style</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Business' style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INDUSTRIES.map(({ label, value }, index: number) => (
                      <SelectItem key={index} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>{"What's this?"}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid w-full items-center gap-1.5'>
            <FormField
              control={form.control}
              name='images'
              render={({}) => (
                <FormItem>
                  <FormLabel>Business Logos</FormLabel>
                  <FormControl>
                    <Input type='file' multiple onChange={handleImageChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {selectedImages.length > 0 && (
            <div className='mt-4'>
              <Carousel
                opts={{
                  align: 'start'
                }}
                className='w-full'
              >
                <CarouselContent>
                  {selectedImages.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className='md:basis-1/2 lg:basis-1/3'
                    >
                      <div className='p-1'>
                        <Card>
                          <CardContent className='flex aspect-square items-center justify-center p-6'>
                            <div className='relative w-full h-60'>
                              <Image
                                key={index}
                                src={image}
                                alt={`Preview ${index}`}
                                fill
                                style={{ objectFit: 'contain' }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious type='button' />
                <CarouselNext type='button' />
              </Carousel>
            </div>
          )}
          <Button type='submit'>Save</Button>
        </form>
      </Form>
    </div>
  );
}
