.. _sdk-release-notes:

.. include:: /migration/deprecation.inc

#############
Release Notes
#############

The dates in the following release notes denote when Chrome and the NaCl SDK
reached canary status. The stable release is typically 6 weeks later.

Chrome/Pepper 49
================

* GCC-based newlib toolchains removed from the SDK.  These have been
  superseded by the nacl-clang toolchain which also produces statically linked
  architecture specific nexe files.
* gtest/gmock no longer shipped as pre-built libraries.  This is in-line with
  normal gtest/gmock usage guidelines.  Projects wishing to use gtest/gmock must
  now add explicit include paths and compile gtest-all.cc locally.

Chrome/Pepper 45 (10 July 2015)
===============================

Pepper
------

* UDP Socket Multicast API in stable (PPB_UDP_SOCKET 1.2).

Chrome/Pepper 43 (03 April 2015)
================================

PNaCl
-----

* The C11/C++11 ``acquire``, ``release``, and ``acq_rel`` memory orders are now
  generated by default. The in-browser Chrome 42 translator supports them, the
  SDK can therefore generate them.
* Fix a `code generation bug on ARM`_ when dealing with 16-bit load/store and
  ``bswap`` which led to a NaCl validation failure.
* PNaCl is now based on LLVM 3.6. If you are using GDB to debug PNaCl
  :ref:`BC files with debug metadata in the browser<debugging_pnacl_pexes>`,
  remember that debug info from SDK version ``X`` is only compatible with the
  PNaCl translator in chrome version ``X``. The bitcode debug metadata format
  changed from LLVM 3.5 to 3.6. If you need to debug an app built with SDK
  version ``X`` running in Chrome version ``Y`` (with ``X != Y``), it is still
  possible to do so. Simply translate the pexe to a nexe using the
  :ref:`offline pnacl-translate tool from SDK version X
  <debugging_pexes_via_nexes>` instead of using the translator in the
  browser (version ``Y``).
* PNaCl's support for use of libstdc++ 4.6 as the C++ standard library is
  deprecated and will be removed in the next release. PNaCl has used libc++
  (which is much more up to date, currently based on LLVM 3.6) as the default
  since Pepper 33.
* PNaCl's experimental `Subzero translator`_ is available for x86-32 NaCl in
  Chrome version 43, behind a flag. To give it a try, run Chrome with the
  ``--enable-pnacl-subzero`` commandline flag, and use the ``optlevel 0``
  :ref:`NaCl manifest option<pnacl_nmf_optlevels>`. Application startup time
  should be several times faster than the previous LLVM-based ``optlevel 0``
  mode, with similar code quality. Note that x86-32 NaCl requires a 32-bit
  Chrome. On Windows, it also requires a 32-bit Windows OS, but 64-bit Linux
  OSes can run x86-32 NaCl. If you try it out, please send us feedback
  on `native-client-dev`_. We are working on improvements and adding
  new targets.

.. _`code generation bug on ARM`: https://code.google.com/p/chromium/issues/detail?id=460432
.. _`Subzero translator`: https://chromium.googlesource.com/native_client/pnacl-subzero/+/main/README.rst
.. _`native-client-dev`: https://groups.google.com/forum/#!forum/native-client-dev

Pepper
------

* UDP Socket Multicast API in development preview (PPB_UDP_SOCKET 1.2).
* Hardware Video Encoder API in development preview (PPB_VIDEO_ENCODER 0.1).

Chrome/Pepper 42 (20 February 2015)
===================================

SDK
---

* The SDK now contains experimental versions of ``i686-nacl-clang``,
  ``x86_64-nacl-clang``, and ``arm-nacl-clang`` as well as the ``clang++``
  equivalents. These toolchains are based on the same LLVM version as PNaCl, but
  can be used to generate NaCl ``.nexe`` files instead of translating a
  ``.pexe`` locally or using the GCC toolchain.

NaCl
----

* The x86 NaCl validators accept instructions from the FMA3 extensions, as well
  as AVX2 instructions (except ``VGATHER``).

PNaCl
-----

* PNaCl supports C11/C++11 memory orders ``acquire``, ``release``, and
  ``acq_rel``. It used to upgrade all accesses to ``seq_cst``. It still upgrades
  ``consume`` to ``acquire`` (no compiler currently implements ``consume``), and
  ``relaxed`` to ``seq_cst`` (to conservatively avoid platform differences due
  to out-of-thin-air problems). This is currently disabled by default in the SDK
  so that the in-browser translator installed on users' machines has time to
  gain this support. Developers can turn it on by passing the
  ``-pnacl-memory-order-seq-cst-only=false`` flag to ``opt``.
* PNaCl handles nested struct type expansion, which allows it to better support
  non-C languages such as Rust.
* PNaCl breaks up many integer operations over 64-bits into individual 64-bit
  operations. This is often encountered when using large consecutive bitfields.

Chrome/Pepper 41 (09 January 2015)
==================================

NaCl
----

* The x86 NaCl validators accept instructions from the AVX1 extensions.

PNaCl
-----

* PNaCl is now based on LLVM 3.5.

Chrome/Pepper 40 (November 07 2014)
===================================

* `VideoDecoder
  </native-client/pepper_stable/cpp/classpp_1_1_video_decoder.html>`_ is now
  stable, see the SDK example in ``pepper_canary/examples/api/video_decode``.

Chrome/Pepper 39 (26 September 2014)
====================================

NaCl
----

* This release contains a fix for CVE-2015-0565: `disable the x86 CLFLUSH
  instruction due to rowhammer problem
  <https://code.google.com/p/nativeclient/issues/detail?id=3944>`_.

Pepper
------

* Support for ``DEBUG_ONLY:dev://postmessage`` has been removed in favor of
  :ref:`other more useful debugging approaches <devcycle-debugging>`.
* ``postMessageAndAwaitResponse`` is now stable and allows JavaScript to
  `communicate synchronously
  </native-client/pepper_stable/cpp/classpp_1_1_message_handler>`_ with PNaCl
  embeds.

Chrome/Pepper 38 (15 August 2014)
=================================

PNaCl
-----

* Compilation speed improvements due to validation caching of the translator and
  linker.
* Performance improvement of SIMD vector shuffle.

Chrome/Pepper 37 (20 June 2014)
===============================

PNaCl
-----

* 2–10% translation time improvement.
* Improved vector load/store and shuffle performance.

Pepper
------

* Media Streams Input support.
* Compositor API.
* Hardware Decode API in development preview.
* Sync API in development preview.

SDK
---

* Demo of a :ref:`full development environment in the browser <io2014>`.

Chrome/Pepper 36 (09 May 2014)
==============================

PNaCl
-----
* Support `LLVM vectors
  <http://clang.llvm.org/docs/LanguageExtensions.html#vectors-and-extended-vectors>`_
  and `GCC vectors
  <http://gcc.gnu.org/onlinedocs/gcc/Vector-Extensions.html>`_ for SIMD
  vectors through :ref:`Portable SIMD Vectors
  <portable_simd_vectors>`. Note that this is still an early release,
  and performance is expected to become acceptable for version 37 of
  Chrome. More SIMD instructions will be added in later releases.

Chrome/Pepper 35 (31 Mar 2014)
==============================

PNaCl
-----
* Upgraded LLVM to version 3.4.
* Translation now uses dynamic load balancing, making translation time faster.
* Unstable pexes (i.e. non-finalized) with debug information can be loaded by
  Chrome, simplifying debugging with PNaCl. See :ref:`Debugging PNaCl pexes
  <debugging_pnacl_pexes>`


Chrome/Pepper 34 (20 Feb 2014)
==============================

Pepper
------
* Filesystems can now be passed from JavaScript to NaCl. The resulting
  ``pp::Var`` will contain a ``pp::Resource`` that can be given to the
  ``pp::FileSystem`` constructor.
* New Audio and Video input APIs have been added as dev interfaces. See
  `pp::MediaStreamAudioTrack
  </native-client/pepper_dev/cpp/classpp_1_1_media_stream_audio_track>`_ and
  `pp::MediaStreamVideoTrack
  </native-client/pepper_dev/cpp/classpp_1_1_media_stream_video_track>`_ for
  more details.

PNaCl
-----
* Parallel translation: at least 1.7x faster, even with older pexes.
* Intelligent abbreviations in the bitcode: 20% reduction in binary size using
  the :ref:`pnacl-compress <pnacl_compress>` tool.

Chrome/Pepper 33 (16 Dec 2013)
==============================

Portable Native Client
----------------------

* PNaCl's default C++ standard library is now LLVM's own libc++, based on
  LLVM 3.3. This library now supports optional ``setjmp``/``longjmp`` exception
  handling (see `announcement
  <https://groups.google.com/forum/#!topic/native-client-discuss/0spfg6O04FM>`_
  for details).

SDK
---

* The ``nacl_io`` library now includes a FUSE mount.
* In the SDK examples, ``common.js`` now loads the Release version of the
  nexes/pexes that are built (by default).
* "``make debug``" and "``make run``" have been fixed on Mac.

PNaCl enabled by default in Chrome 31 (12 Nov 2013)
===================================================

* Portable Native Client (PNaCl) is enabled by default in Chrome 31. See
  :doc:`NaCl and PNaCl </nacl-and-pnacl>` for details on the differences between
  NaCl and PNaCl.
* The PNaCl ABI has changed from the preview release in Chrome 30.
  Pexe modules built with the ``pepper_30`` bundle in the SDK must be recompiled
  with the ``pepper_31`` bundle or later.
  As a general rule, we always recommended building applications with the latest
  stable bundle in the Native Client SDK.
  The PNaCl ABI will remain stable starting with the release of Chrome 31.
* Additional changes in the Chrome/Pepper 31 release:

  * Updates to the Pepper API, including socket and network support
  * Improved socket support in the ``nacl_io`` library

PNaCl in Chrome 30 Dev channel (01 Aug 2013)
============================================

* Portable Native Client (PNaCl) is currently available for preview in Chrome
  30 (currently in the Dev channel). Apps and sites built with PNaCl can run in
  Chrome 30 without an explicit flag.
* See `Introduction to Portable Native Client
  <http://www.chromium.org/nativeclient/pnacl/introduction-to-portable-native-client>`_
  for information on developing for PNaCl. More documentation will be available
  soon.
* Please note that the `PNaCl bitcode ABI
  <http://www.chromium.org/nativeclient/pnacl/bitcode-abi>`_ may still change
  before the official public release; if you're developing a PNaCl-based
  application, be sure to build your code with the latest version of the Native
  Client SDK.
* Update: PNaCl is not enabled by default in beta or stable versions of M30.

PNaCl (15 May 2013)
===================

* Portable Native Client (PNaCl) is currently available for developer preview
  in Chrome 29 or higher.
* To produce a PNaCl executable (.pexe) file, you must use the pnacl toolchain
  in the current ``pepper_canary`` bundle. Chrome 29 does not support .pexe
  files produced by earlier versions of the pnacl toolchain (that is,
  executables compiled with the ``pepper_28`` bundle or earlier).
* To run an application with a PNaCl module, you must launch Chrome 29 with the
  ``--enable-pnacl`` flag (for `Chrome apps </apps>`_), or the ``--enable-nacl``
  flag (for other apps).
* When you launch Chrome with the ``--enable-pnacl`` flag, Chrome loads a PNaCl
  translator in the background. Wait about a minute after you launch Chrome and
  check `tangram://nacl <tangram://nacl>`_ to verify that the translator loaded.
* PNaCl translators are currently available for 32-bit x86, 64-bit x86, and ARM
  architectures.
* PNaCl applications must use the newlib C library (glibc and dynamic linking
  are not supported yet).
* The intermediate representation (IR) format may change prior to the release
  of PNaCl. If so, you will need to recompile your application with the pnacl
  toolchain in a new SDK bundle.

Pepper 27 (12 April 2013)
=========================

The Pepper 27 bundle features a significant number of new libraries that have
been incorporated directly into the SDK.

Libraries
---------

* A number of libraries from the naclports project have been incorporated
  directly into the Native Client SDK. These libraries include:

  * image encoding/decoding: jpeg, tiff, png, webp
  * multimedia: openal, freealut, ogg, vorbis
  * XML parsing: tinyxml, xml2
  * miscellaneous: zlib (general purpose compression), freetype (font
    rendering), lua (Lua interpreter)

  The libraries are located in ``ports/lib``, and the header files are in
  ``ports/include``.

* The ``httpfs`` filesystem in the nacl_io library now caches content in memory
  by default; this improves performance considerably.
* For applications compiled with a glibc toolchain, ``dlopen()`` can now be
  used to open shared libraries that are not specified in an application's
  Native Client manifest (.nmf) file. This allows applications, for example, to
  download a shared object and then use ``dlopen()`` to access the shared
  object.  The ``dlopen`` example has been modified to demonstrate this
  functionality: reverse.cc is built into a shared object (.so) file, which is
  downloaded and opened using an ``httpfs`` mount.

Examples
--------

* Each example now has a single ``index.html`` file, instead of multiple HTML
  files corresponding to NaCl modules built using different toolchains and
  configurations. By default, most examples are built using one toolchain
  (newlib) and one configuration (Debug). If you build an example using
  multiple toolchains or configurations, you can specify which version to run
  in Chrome using the query parameters ``tc`` and ``config``. For example,
  assuming you are serving an example from the local server localhost:5103, you
  can run a version of the example built with the glibc toolchain in the
  Release configuration by specifying the following URL in Chrome:
  ``http://localhost:5103/index.html?tc=glibc&config=Release``. For additional
  information about how different NaCl modules are loaded into ``index.html``,
  see the ``common.js`` file in each example.

Build tools and toolchains
--------------------------

* Common makefiles, including ``tools/common.mk``, can now handle source files
  located outside of an application's root directory. For example, a Makefile
  for an application can specify a source file to compile such as
  ``../../some/other/place.cpp``.

Pepper 26 (29 March 2013)
=========================

The Pepper 26 bundle includes a new HTTP filesystem type in the nacl_mounts
library (which has been renamed nacl_io), changes to the example Makefiles, a
simple new 3D example, and a threaded file IO example.

Build tools and toolchains
--------------------------

* Makefiles have been changed significantly:

  * Build commands are now specified in a number of common files
    (``tools/*.mk``), which are included in the Makefiles in the examples.
  * By default, make displays a simplified list of build steps (e.g., ``CC
    newlib/Debug/hello_world_x86_32.o``) rather than the actual build commands.
    To see the actual build commands, run ``make V=1``.
  * By default, most examples are built using one toolchain (newlib) and one
    configuration (Debug). To build an example using a different toolchain or
    configuration, run ``make`` with the parameters ``TOOLCHAIN=<x>`` or
    ``CONFIG=<y>``.  You can also run make ``all_versions`` to build an example
    with all toolchains.

* Header files have been moved out of the toolchains. All toolchains now share
  the same set of header files as host builds. Previously host and NaCl builds
  used different headers, which could cause build problems.

Libraries
---------

* The nacl_mounts library has been renamed **nacl_io**, and has been expanded
  with a new type of mount, httpfs, which can be used to read URLs via HTTP.
  For details see ``include/nacl_io/nacl_io.h``, as well as the
  ``hello_nacl_io`` example.

Examples
--------

* A new example, **hello_world_instance3d**, has been added to demonstrate a
  simplified 3D app.
* The **file_io** example has been rewritten to do all file operations on a
  thread.  The example demonstrates how to use the MessageLoop API and blocking
  callbacks on a thread.

General
-------

* Old bundles (``pepper_20`` and earlier) have been removed from the Native
  Client SDK Manifest, and will no longer be updated by the ``naclsdk``
  command.

Pepper 25 (21 December 2012)
============================

The Pepper 25 bundle features an ARM toolchain to build Native Client modules
for ARM devices, two new Pepper APIs (including the MessageLoop API, which lets
you make Pepper calls on background threads), two new libraries (nacl_mounts,
which provides a virtual file system that you can use with standard C file
operations, and ppapi_main, which lets you implement a Native Client module
using a simple ppapi_main function), and two new examples that demonstrate how
to use the nacl_mounts and ppapi_main libraries.

Build tools and toolchains
--------------------------

* The SDK includes a new toolchain to build Native Client executables (.nexe
  files) for **ARM devices**.

  * Currently the ARM toolchain can only be used to compile modules that use
    the :ref:`newlib C library <c_libraries>`. You cannot use the ARM toolchain
    to compile modules that use the glibc library.
  * The ARM toolchain is in the directory
    ``pepper_25/toolchain/<host>_arm_newlib``.  The bin subdirectory contains
    the compiler (``arm-nacl-gcc``), the linker (``arm-nacl-g++``), and the
    other tools in the toolchain.
  * Take a look at the ``hello_world`` example to see how to use the ARM
    toolchain. Go to ``examples/hello_world`` and run ``make``. When the build
    finishes, the newlib/Debug and newlib/Release subdirectories will contain
    .nexe files for the x86-32, x86-64, and ARM target architecutes, and a
    Native Client manifest (.nmf file) that references those three .nexe files.

* The simple web server included in the SDK, ``httpd.py``, has been moved from
  the ``examples/`` directory to the ``tools/`` directory. On Windows, you can
  run ``httpd.cmd`` (in the ``examples/`` directory) to start the server.

PPAPI
-----

Pepper 25 includes two new APIs:

* The `Console API
  </native-client/pepper_stable/c/struct_p_p_b___console__1__0>`_ lets your
  module log messages to the JavaScript console in the Chrome browser.
* The `MessageLoop
  </native-client/pepper_stable/cpp/classpp_1_1_message_loop>`_ API lets your
  module make PPAPI calls on a background thread.  Once you've created a
  message loop resource, attached it to a thread, and run it, you can post work
  to the thread, including completion callbacks for asynchronous operations.
  For a C++ example of how to use the MessageLoop API, see
  ``pepper_25/include/ppapi/utility/threading/simple_thread.h``. Note that you
  cannot make asynchronous PPAPI calls on a background thread without creating
  and using a message loop.

Libraries
---------

The SDK includes two new libraries:

* The **nacl_mounts** library provides a virtual file system that your module
  can "mount" in a given directory tree. The file system can be one of several
  types:

  * "memfs" is an in-memory file system,
  * "dev" is a file system with various utility nodes (e.g., ``/dev/null``,
    ``/dev/console[0-3]``, ``/dev/tty``), and
  * "html5fs" is a persistent file system.

  Once you've mounted a file system in your module, you can use standard C
  library file operations: fopen, fread, fwrite, fseek, and fclose. How those
  operations are performed depends on the type of file system (e.g., for
  html5fs, the operations are performed using the Pepper FileIO API). For a
  list of the types of file systems you can mount, see
  include/nacl_mounts/nacl_mounts.h. For an example of how to use nacl_mounts,
  see examples/hello_nacl_mounts. Note that html5fs is subject to the same
  constraints as persistent :ref:`local file IO <devguide-coding-fileio>` in
  Chrome (for example, prior to using an html5fs file system, you must `enable
  local file IO <enabling_file_access>`_).

* The **ppapi_main** library simplifies the creation of a NaCl module by
  providing a familiar C programming environment. With this library, your
  module can have a simple entry point called ppapi_main(), which is similar to
  the standard C main() function, complete with argc and argv[] parameters.
  Your module can also use standard C functions such as printf(), fopen(), and
  fwrite(). For details see include/ppapi_main/ppapi_main.h. For an example of
  how to use ppapi_main, see examples/hello_world_stdio.

Header files for the new libraries are in the ``include/`` directory, source
files are in the ``src/`` directory, and compiled libraries are in the ``lib/``
directory.

Examples
--------

* The SDK includes two new examples:

  * **hello_nacl_mounts** illustrates how to use standard C library file
    operations in a Native Client module through the use of the nacl_mounts
    library.
  * **hello_world_stdio** illustrates how to implement a Native Client module
    with a ppapi_main() function, and how to write to STDOUT and STDERR in a
    module, through the use of the nacl_mounts and ppapi_main libraries. This
    example makes it easy for new users to get started with Native Client by
    letting them start making changes in a familiar C environment.

* With a few exceptions, the Makefile for each example now builds the following
  versions of each example:

  * glibc toolchain: 32-bit and 64-bit .nexes for the x86 target architecture
  * newlib toolchain: 32-bit and 64-bit .nexes for the x86 target architecture,
    and ARM .nexe for the ARM architecture
  * pnacl toolchain: .pexe (which is subsequently tranlsated to .nexes for the
    x86-32, x86-64, and ARM architectures)
  * hosted toolchain: .so or .dll (to be executed as a Pepper plug-in in
    Chrome)

* Additionally, each version is built in both a Debug and a Release
  configuration.
* The Makefile for each example includes two new targets: ``make RUN`` and
  ``make LAUNCH``. These targets, which are interchangeable, launch a local
  server and an instance of Chrome to run an example. When the instance of
  Chrome is closed, the local server is shut down as well.
* The hello_world_stdio example includes a simplified Makefile that only lists
  source dependencies, and invokes the build rules in a separate file
  (common.mk).

Pepper 24 (5 December 2012)
===========================

The Pepper 24 bundle features a new, experimental toolchain called PNaCl (short
for "Portable Native Client"), a new library (pthreads-win32) for the Windows
SDK, and an expanded list of attributes for Pepper 3D contexts that lets
applications specify a GPU preference for low power or performance.

Build tools and toolchains
--------------------------

* The SDK includes a new, experimental toolchain called `PNaCl
  <http://nativeclient.googlecode.com/svn/data/site/pnacl.pdf>`_ (pronounced
  "pinnacle"). The PNaCl toolchain produces architecture-independent executable
  files (.pexe files). Chrome doesn't yet support .pexe files directly, but if
  you want to experiment with this early preview of PNaCl, the toolchain
  includes a tool to translate .pexe files into architecture-specific .nexe
  files. Take a look at the ``hello_world`` example to see how to build a .pexe
  file and translate it into multiple .nexe files. Note that PNaCl is currently
  restricted to the newlib C standard library – if your application uses glibc,
  you can't build it with PNaCl.
* The ``create_nmf.py`` script uses ELF headers (rather than file names) to
  determine the architecture of .nexe files. That means you can change the
  names of your .nexe files and ``create_nmf.py`` will still be able to
  generate the appropriate Native Client manifest file for your application.

Examples
--------

* The SDK examples now build with four toolchains: the glibc and newlib
  toolchains, the experimental PNaCl toolchain, and the hosted toolchain on
  your development machine. Within each toolchain build, each example also
  builds both a debug and a release version.
* The example Makefiles use dependency (.d) files to enable incremental builds.
* The pong example has been cleaned up and modified to run more smoothly. The
  drawing function is now set up as the Flush() callback, which allows 2D
  drawing to occur as quickly as possible.

PPAPI
-----

* When creating a 3D rendering context, the `attribute list
  </native-client/pepper_stable/c/group___enums#ga7df48e1c55f6401beea2a1b9c07967e8>`_
  for the context can specify whether to prefer low power or performance for
  the GPU. Contexts with a low power preference may be created on an integrated
  GPU; contexts with a performance preference may be created on a discrete GPU.

Windows SDK
-----------

* The Windows SDK includes the pthreads-win32 library to assist in porting from
  win32 code. You can use this library when developing your module as a Pepper
  plug-in (.dll). See pepper_24/include/win/pthread.h and
  pepper_24/src/pthread/README for additional information.
* The update utility naclsdk.bat works when it is run from a path with spaces.

Pepper 23 (15 October 2012)
===========================

The Pepper 23 bundle includes support for the nacl-gdb debugger on Mac and
32-bit Windows, resources to enable hosted development on Linux, and changes to
make the SDK examples compliant with version 2 of the Chrome Web Store manifest
file format.

Tools
-----

* The :ref:`nacl-gdb debugger <using_gdb>` now works on all systems (Mac,
  Windows, and Linux).

* The output of the SDK update utility has been simplified. When you run the
  command ``naclsdk list``, the utility displays one line for each available
  bundle, annotated with an "``I``" if the bundle is already installed on your
  system, and a "``*``" if the bundle has an update available. To see full
  information about a bundle, use the command ``naclsdk info <bundle>`` (for
  example, ``naclsdk info pepper_28``).

Linux SDK
---------

* Developers using the Linux SDK now have resources, including pre-built
  libraries and example Makefiles, that make it easier to **build a module as a
  Pepper plugin** (sometimes called a "trusted" or "in-process" plugin) using
  the native C/C++ compiler on their development system. In essence this makes
  developing a Native Client module a two-step process:

  #. Build the module into a shared library (.so file) using your system's
     C/C++ compiler. Test and debug the .so file using the tools in your normal
     development environment.
  #. Build the module into a .nexe file using the compiler from one of the
     Native Client toolchains in the SDK (nacl-gcc or nacl-g++). Test and debug
     the .nexe file using nacl-gdb.

  This two step development process has many benefits—in particular, you can
  use the compilers, debuggers, profilers, and other tools that you're already
  familiar with. But there are a few potential issues to keep in mind:

  * Chrome uses different threading models for trusted plugins and Native
    Client modules.
  * Certain operations such as platform-specific library calls and system calls
    may succeed during trusted development, but fail in Native Client.

  Here are the resources you can use to build your module into a Pepper plugin:

  * header files are in ``pepper_23/include``
  * source files are in ``pepper_23/src``
  * pre-built libraries are in ``pepper_23/lib``

  You can now build and run most of the examples in the SDK as Pepper plugins.

  * Look at the example Makefiles or run ``make`` in the example directories to
    see the commands and flags used to build modules as Pepper plugins.
  * Run ``make LAUNCH`` in the example directories to see how to use the
    ``--register-pepper-plugins`` argument to load a Pepper plugin in Chrome.
    Note that you must set the ``CHROME_PATH`` environment variable and start a
    :ref:`local server <web_server>` prior to running this command.

Examples
--------

* On Linux and Windows systems, most of the examples now build with three
  toolchains: the Native Client glibc and newlib toolchains, and the native
  toolchain on the host system. Modules built with the native toolchain on the
  host system can only run as Pepper plugins.
* All examples in the SDK now comply with version 2 of the Chrome Web Store
  `manifest file format </extensions/manifest>`_. By default,
  applications that use version 2 of the manifest file format apply a strict
  `content security policy </extensions/contentSecurityPolicy>`_, which
  includes a restriction against inline JavaScript. This restriction prohibits
  both inline ``<script>`` blocks and inline event handlers (e.g., ``<button
  onclick="...">``).  See `Manifest Version </extensions/manifestVersion>`_ for
  a list of changes between version 1 and version 2 of the manifest file
  format, and a support schedule for applications that use version 1.

PPAPI
-----

* `PP_InputEvent_Modifier
  </native-client/pepper_stable/c/group___enums#ga21b811ac0484a214a8751aa3e1c959d9>`_
  has two new enum values (_ISLEFT and _ISRIGHT).
* The memory leak in the `WebSocket
  </native-client/pepper_stable/c/struct_p_p_b___web_socket__1__0>`_ API has
  been fixed.

Pepper 22 (22 August 2012)
==========================

The Pepper 22 bundle includes a **command-line debugger**, resources to enable
**hosted development on Windows**, and changes to the example Makefiles (each
example now builds both a debug and a release version).

Tools
-----

* The SDK now includes a **command-line debugger** that you can use to debug
  Native Client modules. See :ref:`Debugging with nacl-gdb
  <devcycle-debugging>` for instructions on how to use this debugger. For now,
  nacl-gdb only works on 64-bit Windows, 64-bit Linux, and 32-bit Linux
  systems. Support for Mac and 32-bit Windows systems will be added soon.

Windows SDK
-----------

* Developers using the Windows SDK can now **build a module as a Pepper
  plugin** (sometimes called a "trusted" or "in-process" plugin) using the
  native C/C++ compiler on their development system. In essence this makes
  developing a Native Client module a two-step process:

  #. Build the module into a DLL using your system's C/C++ compiler. Test and
     debug the DLL using the tools in your normal development environment.
  #. Build the module into a .nexe using the compiler from one of the Native
     Client toolchains in the SDK (nacl-gcc or nacl-g++). Test and debug the
     .nexe using nacl-gdb.

  This two step development process has many benefits—in particular, you can
  use the compilers, debuggers, profilers, and other tools that you're already
  familiar with. But there are a few potential issues to keep in mind:

  * Some libraries that are commonly used with Native Client may not build
    easily on Windows.
  * You may need to put in extra effort to get source code to compile with
    multiple compilers, e.g., Microsoft Visual Studio and GCC.
  * Chrome uses different threading models for trusted plugins and Native
    Client modules.
  * Certain operations such as platform-specific library calls and system calls
    may succeed during trusted development, but fail in Native Client.

  Here are the resources you can use to build your module into a DLL:

  * header files are in ``pepper_22\include``
  * source files are in ``pepper_22\src``
  * pre-built libraries are in ``pepper_22\lib``

* A Visual Studio add-in will be available in the near future with
  configurations that include platforms for both Pepper plugins and NaCl
  modules.

.. Note::
  :class: note

  **Note:** It's also possible to build a module as a trusted plugin on Mac and
  Linux systems, but doing so requires more work because the SDK does not yet
  include the above resources (library source files and pre-built libraries)
  for Mac and Linux systems. To build and debug a trusted plugin on Mac and
  Linux systems, you need to `get the Chromium code
  <http://dev.chromium.org/developers/how-tos/get-the-code>`_ and then follow
  the `Mac instructions
  <http://www.chromium.org/nativeclient/how-tos/debugging-documentation/debugging-a-trusted-plugin/trusted-debugging-on-mac>`_
  or `Linux instructions
  <http://www.chromium.org/nativeclient/how-tos/debugging-documentation/debugging-a-trusted-plugin/debugging-a-trusted-plugin-on-linux>`_.
  In the future, the SDK will include resources for hosted development on Mac
  and Linux as well as Windows.

Examples
--------

* Each example in the SDK now builds both a debug and a release version. As
  before, most examples also build newlib and glibc versions, which means that
  there are now four versions for each example. Take a look at the Makefiles in
  the examples to see the compiler flags that are used for debug and release
  versions. For a description of those flags, see :ref:`Compile flags for
  different development scenarios <compile_flags>`.
* Comments have been added to common.js, which is used in all the examples. The
  JavaScript in common.js inserts an <embed> element that loads the NaCl module
  in each example's web page, attaches event listeners to monitor the loading
  of the module, and implements handleMessage() to respond to messages sent
  from the NaCl module to the JavaScript side of the application

PPAPI
-----

* The ``CompletionCallbackFactory`` class template now takes a thread traits
  class as its second parameter. For details see the `CompletionCallbackFactory
  class template reference
  </native-client/pepper_stable/cpp/classpp_1_1_completion_callback_factory#details>`_.

.. TODO: Port release notes for older releases
