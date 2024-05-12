import { Access } from "../../domain/models/access.model";
import { AccessRepositoryPrisma } from "./access.repository.prisma";

describe("AccessRepositoryPrisma", () => {
    let accessRepository: AccessRepositoryPrisma;

    beforeAll(() => {
        accessRepository = new AccessRepositoryPrisma();
    });

    test("insert() should insert an access", async () => {
        const newAccess: Access = new Access({
            name: "Admin",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const insertedAccess = await accessRepository.insert(newAccess);
        expect(insertedAccess).toBeDefined();
        expect(insertedAccess.name).toBe("Admin");
    });

    test("findById() should find an access by id", async () => {
        const existingAccessId = "existing-access-id";
        const foundAccess = await accessRepository.findById(existingAccessId);
        expect(foundAccess).toBeDefined();
        expect(foundAccess!.id).toBe(existingAccessId);
    });

    test("findAll() should return all accesses", async () => {
        const allAccesses = await accessRepository.findAll();
        expect(allAccesses).toBeDefined();
        expect(allAccesses.length).toBeGreaterThan(0);
    });

    test("update() should update an access", async () => {
        const existingAccessId = "existing-access-id";
        const updatedAccess: Access = new Access({
            id: existingAccessId,
            name: "Updated Admin",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await accessRepository.update(updatedAccess);
        expect(result).toBeDefined();
        expect(result.name).toBe("Updated Admin");
    });

    test("delete() should delete an access", async () => {
        const accessToDeleteId = "access-to-delete-id";
        await accessRepository.delete(accessToDeleteId);
        const deletedAccess = await accessRepository.findById(accessToDeleteId);
        expect(deletedAccess).toBeNull();
    });
});
