# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["VstepBackend.csproj", "./"]
RUN dotnet restore "VstepBackend.csproj"
COPY . .
RUN dotnet build "VstepBackend.csproj" -c Release -o /app/build
RUN dotnet publish "VstepBackend.csproj" -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "VstepBackend.dll"]
