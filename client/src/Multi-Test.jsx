{
  /* <div className="field my-2">
  <Label htmlFor="locationId">Location</Label>
  <Controller
    control={control}
    name="locationId" // 👈 plural, array
    defaultValue={[]} // 👈 MUST be array
    render={({ field }) => (
      <MultiSelector
        values={field?.value?.map((id) => {
          const loc = locations.find((l) => l.id === id);
          return { value: id, label: loc?.name || id };
        })}
        onValuesChange={(vals) => field.onChange(vals?.map((v) => v.value))}
      >
        <MultiSelectorTrigger>
          <MultiSelectorInput placeholder="Select locations for products" />
        </MultiSelectorTrigger>
        <MultiSelectorContent>
          <MultiSelectorList>
            {locations.map((loc) => (
              <MultiSelectorItem key={loc.id} value={loc.id} label={loc.name}>
                {loc.name}
              </MultiSelectorItem>
            ))}
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>
    )}
  />
</div>; */
}
