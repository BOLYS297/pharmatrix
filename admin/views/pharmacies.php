<?php
$pharmacies= $pharmaciedb->readAll();
?>

<div class="d-sm-flex align-items-center justify-content-between mt-4">
    <h1>Pharmacies</h1>
    <button class="btn btn-primary btn-md" data-bs-toggle="modal" data-bs-target="#formModal">
        <i class="fas fa-plus me-1"></i> 
        Ajouter une pharmacie
    </button>
</div>



<!-- Liste des Pharmacies -->
<div class="card shadow mb-4">
    <div class="card-header py-3 d-flex justify-content-between align-items-center">
        <h6 class="m-0 font-weight-bold text-primary">
            Liste des pharmacies
        </h6>
        <div class="dropdown">
            <button aria-label="btn" class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button"
                id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-cog"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li>
                    <a class="dropdown-item export-excel" href="#"><i class="fas fa-file-excel me-2"></i>Exporter en
                        Excel</a>
                </li>
                <li>
                    <a class="dropdown-item export-pdf" href="#"><i class="fas fa-file-pdf me-2"></i>Exporter en PDF</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="dataTable table table-striped table-bordered" style="width: 100%">
                <thead class="table-light">
                    <tr>
                        <th>N°</th>
                        <th>Intitulé</th>
                        <th>Téléphone</th>
                        <th>Localisation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        if($pharmacies != null && sizeof($pharmacies) > 0) :
                            $i= 0;
                            foreach($pharmacies as $ph) :
                                $i++;
                    ?>
                    <tr>
                        <td><?= $i ?></td>
                        <td><?= $ph->name ?></td>
                        <td><?= $ph->phone ?></td>
                        <td><?= $ph->location ?></td>
                        <td>
                            <button aria-label="Modifier" class="btn btn-sm btn-warning btn-update" data-bs-toggle="modal" data-bs-target="#formModal" onclick="editForm(<?= json_encode($ph) ?>)">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button aria-label="Supprimer" class="btn btn-sm btn-danger btn-delete" onclick="deleteForm(<?= $ph->pharmacie_id ?>)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <?php
                            endforeach;
                        endif;
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>




<!-- Form Modal -->
<div class="modal fade" id="formModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">Ajouter une pharmacie</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form name="form_edit" method="POST" action="controller/pharmacieController.php?action=create">
                    <p>
                        <label class="form-label fw-bold">
                            Entrez l'intitulé
                        </label>
                        <input type="text" name="name" id="name" required class="form-control" />
                    </p>

                    <p>
                        <label class="form-label fw-bold">
                            Entrez le numéro de téléphone
                        </label>
                        <input type="tel" name="phone" id="phone" required class="form-control" />
                    </p>

                    <p>
                        <label class="form-label fw-bold">
                            Localisation
                        </label>
                        <textarea name="location" id="location" required class="form-control"></textarea>
                    </p>

                    <p class="text-right">
                        <input type="reset" class="btn btn-danger" value="Effacer" data-bs-dismiss="modal" />
                        <input type="submit" class="btn btn-success" value="Enregistrer" />
                    </p>
                </form>
            </div>
            <div class="modal-footer">
                
            </div>
        </div>
    </div>
</div>