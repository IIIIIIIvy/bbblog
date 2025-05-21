---
title: Docker
---

## 1. Introduction
### 1.1 What is a Container?
- In the <b>physical world</b>, container is a standardized unit of storage in the shipping industry. <u>Standardized containers provide a consistent, predictable unit of storage</u> that can be easily transferred to truck or rail transportation. By focusing on containers instead of individual pieces of cargo, we have improved efficiency,increased productivity, and reduced costs for consumers.This is a great example of using <u>abstraction</u> to increase agility.
- While in the <b>virtual world</b>, a container is <u>a standardized unit of software</u> designed to run quickly and reliably on any computing environment that is running the containerization platform.
- Containers are a form of virtualization that is implemented at the operating system level. ==Containers are lightweight, standalone packages that include everything needed to run an application=={!info}, such as code, runtime, system tools, system libraries, and settings.
- A single server can host <u>several containers that all share the underlying host system's OS Kernel</u>. These containers might be services that are part of a larger enterprise application, or they might be separate applications that are running in their isolated environment.

### 1.2 History of Virtualization
<u>Technical maturity is often associated with increasec levels of abstraction.</u> 

#### 1.2.1 Bare-metal servers
Bare metal refers to ==a physical computer=={.info}, specifically a server, that has one and only one operating system. <u>The distinction is important in modern computing because many, if not most, servers are virtual machines.</u> A physical server is typically a fairly large computer with powerful hardware built-in. 
Installing an operating system and running applications directly on that physical hardware, without virtualization, is referred to as running on “bare metal.”
- workstyle: With bare metal servers the architectural layers, such as the infrastructure and application software layers are built. For example: you install an operating system on top of your server hardware, install any shared libraries on top of that operating system, and then install your applications that use those libraries. 
- downside: 
    - it's massively inefficient: your hardware costs are the same whether you are running at 0% utilization or 100% utilization. 
    - keep the versions of your libraries <u>in sync with all your applications</u>: lf one application requires an updated version of a library that is incompatible with other applications running on that host, then you run into problems.

#### 1.2.2 Virtual machines
A virtual machine, commonly shortened to just VM, is no different than any other physical computer like a laptop, smart phone, or server. It has a CPU, memory, disks to store your files, and can connect to the internet if needed. While the parts that make up your computer (called hardware) are physical and tangible, ==VMs are often thought of as virtual computers or software-defined computers within physical servers, existing only as code.=={.info}
Virtual machines (VMs) are a way to run multiple applications on a single server. Each VM runs on top of a **hypervisor**, which is a piece of software that that can carve up the host resources into multiple isolated virtual hardware configuration which you can then treat as their own systems (each with an OS, binaries/libraries, and applications).
You can increase agility by <u>putting a **virtualization platform** over the operating system</u>. 
- workstyles: Now you have isolated applications and their libraries with their own full operating system into avirtual machine (VM). This improves utilization.
- downside:
    - the virtualization layer is "heavy": you may have four operating systemson the host instead of one.That means <u>more patching,more updates, significantly more space being taken upon the physical host.</u> 
    - significant redundancy: you've installed potentially the same OS four times, and potentially the same library three times.

#### 1.2.3 Containers
 Containers are a way to run multiple applications on a single server without the overhead of a hypervisor. Each container runs on top of a **container engine** (software that manages the lifecycle of containers), which oversees and isolates processes using the host operating system’s kernel features.
  - workstyles: The container runtime shares the operating systems kernel, enabling you to create container images using file system layers. 
  - advantages:
    - lightweight, efficient, and fast: They can be spun up and spun down faster than virtual machines, allowing for better utilization of the underlying hardware.
    - share libraries: You can share libraries when needed, but you can also have library isolation for your applications. 
    - highly portable: Because containers isolate software from the other layers, their code runs identically across different environments: from development and staging, all the way to production.

:::
![alt text](from_virtualization_to_container.png)

And ==Docker=={.info} makes CONTAINER popular again.


### 1.3 What are the advantages of a microservice environment?
#### 1.3.1 Traditional vs microservice architecture
- Traditional architecture
Consider this example of atraditional architecture. All the processes for one of the applications are tightly coupled and run as a single service. 
    - This means that <u>if one process of the application experiences a spike in demand, the entire architecture must be scaled.</u>
    - Adding or improving features becomes more complex as the code base grows, which limits experimentation and makes it difficult to implement new ideas.
    - Monolithic architectures also add risk for application availability because many dependent and tightly coupled processes increase the impact of a single process failure. 
    - And you cansee where there is a lot of<u> redundancy of function across different applications.</u>
- Microservice architecture
Now consider the same three applications running ina microservice architecture: ==Each application is built as an independent component that runs as a service and communicates by using lightweight APl operations.=={.info}
    - Each service performs a single function that can support multiple applications. 
    - We also see <u>a migration away from dedicated servers to an abstracted hardware layer</u> where micro services can be intelligently placed based on needs, such as performance and resilience.
![alt text](traditional&microservice_architecture.png)

#### 1.3.2 Characteristics of microservices
- Decentralized,evolutionary design
    - Each container uses ==the language and technology that is best suited for the functioning of the service=={.info} instead of requiring users to use a specific language or a specific technology. 
    - Each component or system in the architecture is ==evolved separately=={.info} rather than updating the system in amonolithic style.
- Smart endpoints, dumb pipes

    There is no enterprise service bus(企业服务总线); data is not transformed when it's going between services. ==The service receiving the data should be smart enough to handle whatever it is sent.=={.info}
- Independent products, not projects

    Going against the traditional waterfall project model, think of a microservice as ==a separate product with its own inputs and outputs=={.info}. Containers help with this by enabling you to package all your dependencies and your libraries into a single immutable object.
- Designed for failure

    Everything fails all the time. Services are designed to be resilient, redundant, and to handle bad input, or if the service the microservice wants to communicate with is not there.
- Disposability可处理性

    We start fast, fail fast, and release any file handlers. Containers are added and removed, workloads change, and resources are temporary because they constantly change.
- Development and production parity对等

    ==Development, testing and production environments can be made consistent using containers.=={.info} 

To sum it all up,microservices and containers go well together. Containers are the underlying technology that powers modern microservices, and with microservice architectures, developers can take full advantage of containers.

### 1.4 Open Container Initiative (OCI)
The OCI is an industry collaboration that ==aims to create **open industry standards** for container formats and runtimes.=={.info} It was founded by companies like Docker, Google, VMware, Microsoft, Dell, IBM, and Oracle. 

The OCI's primary goal is to ensure the compatibility and interoperability of container environments through three defined technical specifications，which includes:

1. Image Specification: Defines the image's metadata and format, including a serializable file system.
2. Runtime Specification: Describes how to run a container using an image adhering to the Image Specification.
3. Distribution Specification: Outlines how images should be distributed, such as through registries, pushing, and pulling images.

Docker is a specific implementation of the OCI standard. When referring to Docker images or Docker container images, it means the Docker implementation of the OCI specification.


## 2. Underlying Technologies

### 2.1 Namespaces
Docker namespaces are a fundamental feature of Linux that ==Docker uses to create isolated environments for containers=={.info}. They provide a layer of isolation by <u>creating separate instances of global system resources, making each container believe it has its own unique set of resources.</u> 
Docker utilizes several types of namespaces, including PID (Process ID), NET (Network), MNT (Mount), UTS (Unix Timesharing System), IPC (InterProcess Communication), and USER namespaces and by leveraging these namespaces, Docker can create lightweight, portable, and secure containers that run consistently across different environments.

The best way to prevent privilege-escalation attacks from within a container is ==to configure your container's applications to run as unprivileged users.=={.info} For containers whose processes must run as the root user within the container, you can re-map this user to a less-privileged user on the Docker host. The mapped user is assigned a range of UIDs which function within the namespace as normal UIDs from 0 to 65536, but have no privileges on the host machine itself.

### 2.2 cgroups
cgroups or "control groups" are a Linux kernel feature that allows you to allocate and manage resources, such as CPU, memory, network bandwidth, and I/O, among groups of processes running on a system. It plays a crucial role in ==providing resource isolation and limiting the resources that a running container can use.=={.info} Docker utilizes cgroups to **enforce resource constraints on containers**, allowing them to have a consistent and predictable behavior. 

### 2.3 Union File systems
Union file systems, also known as UnionFS, play a crucial role in the overall functioning of Docker. It's a unique type of filesystem that ==creates a virtual, layered file structure by overlaying multiple directories.=={.info} Instead of modifying the original file system or merging directories, UnionFS enables the **simultaneous mounting of multiple directories on a single mount point while keeping their contents separate**. 
This feature is especially beneficial in the context of Docker, as it allows us to manage and optimize storage performance by minimizing duplication and reducing the container image size.


## 3. Docker Basics
### 3.1 Docker Components
There are ==3 key components=={.info} in the Docker ecosystem:

1. Dockerfile

    A text file containing instructions (commands) to build a Docker image.
    Each instruction in a Dockerfile creates <u>a read-only layer</u> in the image, making the container image an immutable object.
    If you change the Dockerfile and rebuild the image, ==only those layers that have changed are rebuilt.=={.info} This is part of what makes container images so lightweight, small, and fast, when compared to other virtualization technologies.

2. Docker Image

    A snapshot of a container, <u>created from a Dockerfile</u>. Images are stored in a registry, like Docker Hub, and can be pulled or pushed to the registry.
    An image is ==a read-only template=={.info} with instructions for creating a container. <u>A running container is an instance of an image.</u> 
    - You can create images from scratch
    - or you can use images that were created by others and published to a public or private registry. 
    An image is usually based on another image, with some customization.

3. Docker Container

    A running instance of a Docker image.

![alt text](Dockerfile.png)

### 3.2 Docker Commands
Some essential Docker commands will be used frequently:
- ```bash
  docker pull <image>
    ```
    Download an image from a registry, like Docker Hub.

- ```bash
  docker build -t <image_name> <path>
    ```
    Build an image from a Dockerfile, where ```<path>``` is the directory containing the Dockerfile.

- ```bash
  docker image ls
    ```
    List all images available on your local machine.

- ```bash
  docker run -d -p <host_port>:<container_port> --name <container_name> <image>
    ```
    Run a container from an image, mapping host ports to container ports.

- ```bash
  docker container ls
    ```
    List all running containers.

- ```bash
  docker container stop <container>
    ```
    Stop a running container.

- ```bash
  docker container rm <container>
    ```
    Remove a stopped container.

- ```bash
  docker image rm <image>
    ```
    Remove an image from your local machine.


## 4. Data Persistence in Docker
When a container starts, it uses the files and configuration provided by the image. Each container is able to create, modify, and delete files and does so without affecting any other containers. When the container is deleted, these file changes are also deleted.

While this ephemeral nature of containers is great, ==it poses a challenge when you want to persist the data=={.info}. For example, if you restart a database container, you might not want to start with an empty database. So, how do you persist files?

### 4.1 Container Volumes
==Volumes are a storage mechanism that provide the ability to persist data beyond the lifecycle of an individual container.=={.note} Think of it like providing a shortcut or symlink from inside the container to outside the container. ==And it is created and managed by Docker.=={.note}That means When you create a volume, it's stored within a directory on the Docker host. 

#### 4.1.1 Mounting a volume over existing data
- If you mount a ```non-empty``` volume into a directory in the container in which files or directories exist, the pre-existing files are <u>obscured by the mount.</u> 

    This is similar to if you were to save files into /mnt on a Linux host, and then mounted a USB drive into /mnt. The contents of /mnt would be obscured by the contents of the USB drive until the USB drive was unmounted.

    With containers, there's no straightforward way of removing a mount to reveal the obscured files again. Your best option is to recreate the container without the mount.

- If you mount an ```empty``` volume into a directory in the container in which files or directories exist, these files or directories are <u>propagated (copied) into the volume by default.</u> Similarly, if you start a container and specify a volume which does not already exist, an empty volume is created for you. This is a good way to pre-populate data that another container needs.

- To prevent Docker from copying a container's pre-existing files into an empty volume, use the ```volume-nocopy``` option.

#### 4.1.2 Named and anonymous volumes
A volume may be named or anonymous. Anonymous volumes are given a random name that's guaranteed to be unique within a given Docker host. Just like named volumes, anonymous volumes persist even if you remove the container that uses them, except if you use the ```--rm``` flag when creating the container, in which case the anonymous volume associated with the container is destroyed.

If you create multiple containers consecutively that each use anonymous volumes, each container creates its own volume. Anonymous volumes aren't reused or shared between containers automatically. To share an anonymous volume between two or more containers, you must mount the anonymous volume using the random volume ID.

#### 4.1.3 Syntax
To mount a volume with the ```docker run ```command, you can use either the ```--mount``` or ```--volume``` flag.
```bash
$ docker run --mount type=volume,src=<volume-name>,dst=<mount-path>
$ docker run --volume <volume-name>:<mount-path>
```
In general, ==```--mount``` is preferred.=={.note} The main difference is that the ```--mount``` flag is more explicit and supports all the available options.

#### 4.1.4 Create and manage volumes
Unlike a bind mount, you can create and manage volumes <u>outside the scope of any container.</u>

- **Create** a volume: create a volume named ```log-data```.
    ```bash
    $ docker volume create log-data
    ```
- **List** volumes:
    ```bash
    $ docker volume ls

    local          my-vol
    ```
- **Inspect** a volume:
    ```bash
    $ docker volume inspect my-vol
    [
        {
            "Driver": "local",
            "Labels": {},
            "Mountpoint": "/var/lib/docker/volumes/my-vol/_data",
            "Name": "my-vol",
            "Options": {},
            "Scope": "local"
        }
    ]
    ```
- **Remove** a volume:
    ```bash
    docker volume rm my-vol
    ```

#### 4.1.4 Start a container with a volume
If you start a container with a volume that doesn't yet exist, Docker will <u>automatically create it</u> for you.

The following example mounts the volume ```myvol2``` into ```/app/``` in the container.

The following ```-v``` and ```--mount``` examples produce the same result.

::: code-tabs
@tab --mount
```bash
docker run -d \
  --name devtest \
  --mount source=myvol2,target=/app \
  nginx:latest
```

@tab -v
```bash
docker run -d \
  --name devtest \
  -v myvol2:/app \
  nginx:latest
```
:::

When the container runs, ==all files it writes into the ```/app``` folder will be saved in this volume,=={.note} outside of the container. If you delete the container and start a new container using the same volume, the files will still be there.

::: tip Sharing files using volumes
You can <u>attach the same volume to multiple containers to share files between containers.</u> This might be helpful in scenarios such as log aggregation, data pipelines, or other event-driven applications.
:::

### 4.2 Bind mounts
When you use a bind mount, a file or directory ==on the host machine=={.note} is mounted from the host into a container. 

By contrast, when you use a volume, a new directory is created <u>within Docker's storage directory on the host machine, and Docker manages that directory's contents.</u>

#### 4.2.1 Bind-mounting over existing data
If you bind mount file or directory into a directory in the container <u>in which files or directories exist</u>, the pre-existing files are <u>obscured by the mount.</u> 

This is similar to if you were to save files into ```/mnt``` on a Linux host, and then mounted a USB drive into ```/mnt```. The contents of ```/mnt``` would be obscured by the contents of the USB drive until the USB drive was unmounted.

With containers, there's no straightforward way of removing a mount to reveal the obscured files again. Your best option is to recreate the container without the mount.

#### 4.2.2 Considerations and constraints
- Bind mounts ==have write access=={.info} to files on the host by default.

    One side effect of using bind mounts is that you can change the host filesystem via processes running in a container, including creating, modifying, or deleting important system files or directories. This capability can have <u>security implications</u>. For example, it may affect non-Docker processes on the host system.
    
    You can use the readonly or ro option to prevent the container from writing to the mount.

- Bind mounts are created to the Docker daemon host, not the client.

    If you're using a remote Docker daemon, you can't create a bind mount to access files on the client machine in a container.

    For Docker Desktop, the daemon runs inside a Linux VM, not directly on the native host. Docker Desktop has built-in mechanisms that transparently handle bind mounts, allowing you to share native host filesystem paths with containers running in the virtual machine.

- Containers with bind mounts are ==strongly tied to the host=={.info}.

    Bind mounts rely on the host machine's filesystem <u>having a specific directory structure available</u>. This reliance means that containers with bind mounts <u>may fail if run on a different host without the same directory structure.</u>

#### 4.2.3 Syntax
To create a bind mount, you can use either the ```--mount``` or ```--volume``` flag.
```bash
$ docker run --mount type=bind,src=<host-path>,dst=<container-path>
$ docker run --volume <host-path>:<container-path>
```
In general, ==```--mount``` is preferred.=={.note} The main difference is that the ```--mount``` flag is more explicit and supports all the available options.

- If you use ```--volume``` to bind-mount a file or directory that <u>does not yet exist</u> on the Docker host, Docker <u>automatically creates</u> the directory on the host for you. It's always created as a directory.

- ```--mount``` ==does not automatically create a directory=={.note} if the specified mount path does not exist on the host. Instead, it produces an error.

#### 4.2.4 Start a container with a bind mount
Consider a case where you have a directory ```source``` and that when you build the source code, the artifacts are saved into another directory, ```source/target/```. You want the artifacts to be available to the container at ```/app/```, and you want the container to get access to a new build each time you build the source on your development host. 

Use the following command to bind-mount the ```target/``` directory into your container at ```/app/```. Run the command from <u>within the ```source directory```</u>. The ```$(pwd)``` sub-command <u>expands to the current working directory on Linux or macOS hosts.</u> If you're on Windows, see also [Path conversions on Windows](https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/topics/).


The following ```-v``` and ```--mount``` examples produce the same result. You can't run them both unless you remove the ```devtest```container after running the first one.

::: code-tabs
@tab --mount
```bash
docker run -d \
  -it \
  --name devtest \
  --mount type=bind source="$(pwd)"/target,target=/app \
  nginx:latest
```

@tab -v
```bash
docker run -d \
  -it \
  --name devtest \
  -v "$(pwd)"/target:/app \
  nginx:latest
```
:::


### 4.3 Difference between volumes and bind mounts

#### 4.3.1 When to use bind mounts
Bind mounts are appropriate for the following types of use case:

- ==Sharing source code or build artifacts=={.note} between a development environment on the Docker host and a container.

- When you want to create or generate files in a container and <u>persist the files onto the host's filesystem</u>.

- Sharing configuration files <u>from the host machine to containers.</u> This is how Docker provides DNS resolution to containers by default, by mounting ```/etc/resolv.conf``` from the host machine into each container.

- Bind mounts are also available for builds: you can bind mount source code from the host into the build container to test, lint, or compile a project.

#### 4.3.2 When to use volumes
Volumes are a good choice for the following use cases:

- Volumes are <u>easier to back up or migrate</u> than bind mounts.
- You can manage volumes using Docker CLI commands or the Docker API.
- Volumes work on both Linux and Windows containers.
- Volumes can be more safely shared among multiple containers.
- New volumes can <u>have their content pre-populated by a container or build.</u>
- When your application <u>requires high-performance I/O.</u>

::: warning
Volumes are **not** a good choice if you need to access the files from the host, as the volume is completely managed by Docker. Use bind mounts if you need to access files or directories from both containers and the host.
:::
